import ImageInput from '@components/common/ImageInput';
import { BoxComponent } from '@components/common';
import useCadeteForm from '@hooks/cadete/useCadeteForm';
import { Cadete } from '@src/types/club/cadete';

interface CadeteFormProps {
    cadete?: Cadete;
}

export default function CadeteForm({ cadete }: CadeteFormProps) {
    const {
        regiones,
        ciudades,
        selectedRegion,
        selectedCiudad,
        register,
        errors,
        handleSelectedRegion,
        setSelectedCiudad,
        setImageFile,
        onSubmit,
    } = useCadeteForm(cadete);

    return (
        <BoxComponent title="Información personal">
            <form className="grid grid-cols-1 gap-6 md:grid-cols-2 items-center" onSubmit={onSubmit}>

                <div className="col-span-1">
                    <ImageInput entityUrl={cadete?.url_foto} entityId={cadete?.id} onImageUpload={setImageFile} />
                </div>

                <div className="col-span-1">
                    <div className="grid grid-cols-1 gap-6 md:gap-4">
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
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                            <input
                                type="date"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                {...register('fecha_nacimiento')}
                            />
                            {errors.fecha_nacimiento && <p className="text-red-500 text-sm">{errors.fecha_nacimiento.message}</p>}
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Fecha de Admisión</label>
                            <input
                                type="date"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                {...register('fecha_admision')}
                            />
                            {errors.fecha_admision && <p className="text-red-500 text-sm">{errors.fecha_admision.message}</p>}
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
                                value={selectedRegion}
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
                                value={selectedCiudad}
                                onChange={(e) => setSelectedCiudad(e.target.value)}
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
                            <label className="block text-sm font-medium text-gray-700">Club</label>
                            <input
                                type="text"
                                placeholder="Club"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                {...register('club')}
                            />
                            {errors.club && <p className="text-red-500 text-sm">{errors.club.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-2">
                    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Enviar</button>
                </div>
            </form>
        </BoxComponent>
    );
}
