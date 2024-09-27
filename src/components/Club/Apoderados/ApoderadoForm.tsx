import useApoderadoForm from '@hooks/cadete/useApoderadoForm';
import { Apoderado } from '@src/types/club/cadete';

interface ApoderadoFormProps {
    apoderado?: Apoderado;
    onClose: () => void;
}

const ApoderadoForm = ({ apoderado, onClose }: ApoderadoFormProps) => {
    const {
        register,
        errors,
        onSubmit,
        regiones,
        ciudades,
        selectedRegion,
        handleSelectedRegion,
        relaciones
    } = useApoderadoForm(apoderado);

    return (
        <div className="w-full p-2">
            <h2 className="text-2xl font-bold mb-6">Formulario de Apoderado</h2>
            <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={onSubmit}>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('nombre')}
                    />
                    {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                </div>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu apellido"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('apellido')}
                    />
                    {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido.message}</p>}
                </div>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">RUT</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu RUT"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('rut')}
                    />
                    {errors.rut && <p className="text-red-500 text-sm">{errors.rut.message}</p>}
                </div>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('email')}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                        type="number"
                        placeholder="Teléfono"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('telefono')}
                    />
                    {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
                </div>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Región</label>
                    <select
                        {...register('region')}
                        // value={selectedRegion}
                        onChange={(e) => handleSelectedRegion(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">Seleccionar Región</option>
                        {regiones.map(region => (
                            <option key={region.id} value={region.nombre}>
                                {region.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
                </div>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                    <select
                        {...register('ciudad')}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        disabled={!selectedRegion}
                    >
                        <option value="">Seleccionar Ciudad</option>
                        {ciudades.map(ciudad => (
                            <option key={ciudad.nombre} value={ciudad.nombre}>
                                {ciudad.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.ciudad && <p className="text-red-500 text-sm">{errors.ciudad.message}</p>}
                </div>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                        type="text"
                        placeholder="Dirección"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('direccion')}
                    />
                    {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion.message}</p>}
                </div>

                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Relación con Cadete</label>
                    <select
                        {...register('relacion')}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">Seleccionar relación</option>
                        {relaciones.map(relacion => (
                            <option key={relacion.nombre} value={relacion.nombre}>
                                {relacion.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.relacion && <p className="text-red-500 text-sm">{errors.relacion.message}</p>}
                </div>

                <div className="col-span-1 md:col-span-2">
                    <div className="flex flex-col gap-2 md:flex-row md:justify-end">
                        <button
                            type="submit"
                            className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2">
                            Enviar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-md px-4 py-2">
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ApoderadoForm;
