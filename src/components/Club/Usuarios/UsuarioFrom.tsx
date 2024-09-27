import { BoxComponent, Loader } from '@components/common';
import { useUsuarioForm } from '@hooks/usuarios';
import { Usuario } from '@src/types/usuario';
import { ClubSelect } from '@components/common/Selects/ClubSelect';
import { ConfirmModal } from '@components/common/Modals';
import { RolesSelect, SubrolesSelect } from '@components/common/Selects';

export function UsuarioForm({ usuarioId }: { usuarioId?: Usuario["id"] }) {
    const {
        loading,
        submitError,
        success,
        user,
        isProfesionalSelected,
        errors,

        formValues,
        onSubmit,
        handleOnSubmit,

        handleChange,
        handleSelectedClub,
        handleSelectedRol,
        handleSelectedSubRol,

        showModal,
        handleCloseConfirmModal,

        getUsuarioRol,
        getUsuario,
        resetForm
    } = useUsuarioForm(usuarioId);

    return (
        <>
            <BoxComponent title="Datos de Usuario">
                {loading ? (
                    <Loader />
                ) : (
                    <form className="grid gap-8" onSubmit={onSubmit}>
                        <div className="grid gap-6">

                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formValues.nombre}
                                        placeholder="Ingresa tu nombre"
                                        className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold text-gray-700">Segundo Nombre</label>
                                    <input
                                        type="text"
                                        name="segundo_nombre"
                                        value={formValues.segundo_nombre}
                                        placeholder="Ingresa tu segundo nombre"
                                        className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                    {errors.segundo_nombre && <p className="text-red-500 text-sm mt-1">{errors.segundo_nombre}</p>}
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold text-gray-700">Apellido Paterno</label>
                                    <input
                                        type="text"
                                        name="apellido_paterno"
                                        value={formValues.apellido_paterno}
                                        placeholder="Ingresa tu apellido paterno"
                                        className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                    {errors.apellido_paterno && <p className="text-red-500 text-sm mt-1">{errors.apellido_paterno}</p>}
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-semibold text-gray-700">RUT</label>
                                    <input
                                        type="text"
                                        name="rut"
                                        value={formValues.rut}
                                        placeholder="Ingresa tu RUT"
                                        className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                    {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut}</p>}
                                </div>

                                {getUsuarioRol?.nombre === 'SuperAdmin' && usuarioId !== getUsuario?.id && (
                                    <div className="col-span-1">
                                        <ClubSelect
                                            selectedClub={formValues.club}
                                            handleSelectedClub={handleSelectedClub}
                                            errors={errors["club"]}
                                        />
                                    </div>
                                )}
                            </div>

                            <hr className="border-gray-300 my-4" />

                            <div className="col-span-1 grid gap-6">
                                <h3 className="text-lg font-bold text-gray-800">Asignación de Rol</h3>
                                <div>
                                    <RolesSelect
                                        selectedRol={formValues.rol_id}
                                        handleSelectedRol={handleSelectedRol}
                                        errors={errors["rol_id"]}
                                    />
                                </div>
                                {isProfesionalSelected && (
                                    <div>
                                        <SubrolesSelect
                                            selectedSubRoles={formValues.subroles}
                                            handleSelectedSubRol={handleSelectedSubRol}
                                            errors={errors["subroles"]}
                                        />
                                    </div>
                                )}
                            </div>

                        </div>

                        <hr className="border-gray-300 my-4" />

                        <div className="col-span-1 flex flex-wrap justify-end gap-4">
                            <button
                                type="submit"
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                {user ? "Actualizar" : "Crear Usuario"}
                            </button>
                            {!user && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200">
                                    Reiniciar Formulario
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </BoxComponent>

            <ConfirmModal
                show={showModal}
                onClose={handleCloseConfirmModal}
                handleOnSubmit={handleOnSubmit}
                submitError={submitError}
                success={success}
                confirmMessage='¿Confirmas la creación de usuario?'
                successMessage='Usuario creado con éxito'
            />
        </>
    );
}
