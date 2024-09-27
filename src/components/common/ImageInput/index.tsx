import { useState } from "react";
import { Loader } from '@components/common'
import { ImageInputProps } from "@src/types/uploadImage";
import { useUploadImage } from "@hooks/useUploadImage";

const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const maxSizeInBytes = 20 * 1024 * 1024;

export default function ImageInput({ entityUrl, entityId, onImageUpload }: ImageInputProps) {

    const { loading, message, setMessage, uploadImage } = useUploadImage();
    const [url, setUrl] = useState<string | undefined>(entityUrl);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(null);
        const image = event.target.files;

        if (!image || image.length === 0) return;

        const file = image[0];

        if (file) {

            if (!allowedTypes.includes(file.type)) {
                setMessage({ color: 'red', text: 'Tipo de archivo no permitido. Solo se permiten imágenes PNG, JPEG, JPG y WEBP.' });
                return;
            }

            if (file.size > maxSizeInBytes) {
                setMessage({ color: 'red', text: 'El archivo excede el tamaño máximo permitido de 20 MB.' });
                return;
            }

            if (entityId) {
                const imageUrl = await uploadImage(entityId, file);
                setUrl(imageUrl);
            } else {
                renderImage(file);
                onImageUpload(file);
            }
        }
    };

    const renderImage = (file: File) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.error) {
                setMessage({ color: 'red', text: 'Previsualización no disponible' });
                setUrl(undefined);
            } else {
                setUrl(reader.result as string);
                setMessage({ color: 'green', text: 'Imagen cargada' });
            }
        };

        reader.onerror = () => {
            setMessage({ color: 'red', text: 'Previsualización no disponible' });
            setUrl(undefined);
        };

        reader.readAsDataURL(file);
    }

    return (
        <div className="grid grid-cols-1 justify-items-center gap-1">
            <div className="border w-48 h-48 rounded-full">
                {loading ? (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <Loader />
                    </div>
                ) : (
                    <label
                        htmlFor="dropzone-file"
                        className={`flex flex-col items-center justify-center w-full h-full rounded-full border-2 border-gray-300 cursor-pointer bg-gray-100 hover:bg-gray-200
                            ${!url && 'border-dashed'}`}
                        aria-label="Sube tu imagen de perfil"
                    >
                        {url ? (
                            <div className="relative flex flex-col items-center justify-center w-full h-full rounded-full overflow-hidden hover:bg-black hover:bg-opacity-50 transition duration-300 ease-in-out">
                                <img src={url} alt="Uploaded" className="w-full h-full object-cover rounded-full" />
                                <div className="absolute flex items-center bg-gray-500 bg-opacity-50 justify-center w-full h-full opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                                    <i className="bi bi-pencil-square text-4xl text-white drop-shadow"></i>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                <i className="bi bi-cloud-arrow-up text-4xl text-gray-500 dark:text-gray-400"></i>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click </span> o arrastrar imagen
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG o JPG (MAX. 800x400px)
                                </p>
                            </div>
                        )}
                    </label>
                )}
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".png,.jpg,.jpeg,.webp"
                />
            </div>
            {message && (
                <div className="w-48 flex items-center justify-center gap-1 text-center text-xs">
                    <p className={`${message.color === 'red' ? 'text-red-500 bi bi-x-circle-fill' : 'text-green-500 bi bi-check-circle-fill'}`}>
                        <span className="pl-1">{message.text}</span>
                    </p>
                </div>

            )}
        </div>
    );
}