import { useState } from "react";
import { uploadProfileImage } from "@services/cadetes";
import { MessageProps } from "@src/types/uploadImage";

export const useUploadImage = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<MessageProps | null>(null);

    const uploadImage = async (id: string, file: File) => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 3000));

            const formData = new FormData();
            formData.append('id', id);
            formData.append('file', file);

            const response = await uploadProfileImage(formData);
            
            console.log(response);
            setMessage({ color: 'green', text: 'Imagen cargada satisfactoriamente' });
            return '/avatar2.png'; 

        } catch (error) {
            console.error(error);
            setMessage({ color: 'red', text: 'Error al subir una imagen' });
        } finally {
            setLoading(false);
        }
    };

    return { loading, message, setMessage, uploadImage };
};