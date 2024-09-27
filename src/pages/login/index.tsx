import { Loader } from "@components/common";
import { useLoginForm } from "@hooks/auth";

export default function LoginPage() {

    const { register, errors, onSubmit, loading, handleChange, authError } = useLoginForm();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">       
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md grid gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Inicio de sesión</h2>
                <hr />
                {
                    loading ? (
                        <div>
                            <Loader />
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
                            
                            <div className="grid grid-cols-1 gap-2">
                                <label className="block text-sm font-medium text-gray-700">RUT</label>
                                <input
                                    type="text"
                                    placeholder="Ingresa tu RUT"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    {...register('rut')}
                                    onChange={handleChange}
                                />
                                {errors.rut && <p className="text-red-500 text-sm">{errors.rut.message}</p>}
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                                <input
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    {...register('password')}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            {
                                authError && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                        <span className="block sm:inline">{authError}</span>
                                    </div>
                                )
                            }

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    )
                }
            </div>
        </div>
    );
}
