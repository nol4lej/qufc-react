import useFichaTecnicaForm from "@hooks/cadete/useFichaTecnicaForm";
import { Cadete } from "@src/types/club/cadete";

interface FichaTecnicaFormProps {
    cadeteId: Cadete["id"];
    onClose: () => void;
}

const FichaTecnicaForm = ({ cadeteId, onClose }: FichaTecnicaFormProps) => {

    const { register, onSubmit, errors, categorias, posiciones } = useFichaTecnicaForm(cadeteId);

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Crear ficha técnica</h2>
            <form className="grid grid-cols-1 gap-6 md:grid-cols-2 " onSubmit={onSubmit}>
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Categorías</label>
                    <select
                        {...register('categorias', { required: "La categoría es requerida" })}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="" disabled>Seleccionar categoría</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.nombre}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.categorias && <p className="text-red-500 text-sm">{errors.categorias.message}</p>}
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Posiciones</label>
                    <select
                        {...register('posiciones', { required: "La posición es requerida" })}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="" disabled>Seleccionar posición</option>
                        {posiciones.map(posicion => (
                            <option key={posicion.id} value={posicion.nombre}>
                                {posicion.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.posiciones && <p className="text-red-500 text-sm">{errors.posiciones.message}</p>}
                </div>
                <div className="col-span-1 md:col-span-2">
                    <div className="flex flex-col gap-2 md:flex-row md:justify-end">
                        <button
                            type="submit"
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2">
                            Crear
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-md px-4 py-2">
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FichaTecnicaForm;