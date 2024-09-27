import { Rol } from "@src/types/usuario";
import { useEffect, useState } from 'react';
import { ALL_ROLES } from '@config/envs';
import { useAxiosClient } from '@services/axios';
import { useRolesStore } from '@store/roles';
import { useAuth } from "@hooks/auth";

interface RolesSelectProps {
    errors: string;
    selectedRol: Rol["id"];
    handleSelectedRol: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const RolesSelect = ({ selectedRol, handleSelectedRol, errors }: RolesSelectProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const { isSuperAdmin } = useAuth();

    const axios = useAxiosClient();
    const { roles, setRoles } = useRolesStore();

    useEffect(() => {
        if (roles.length === 0) {
            const fetchRoles = async () => {
                try {
                    setLoading(true)
                    const response = await axios.get<Rol[]>(ALL_ROLES);
                    setRoles(response.data);
                } catch (error) {
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };
            fetchRoles();
        }
    }, [setRoles, axios, roles]);

    return (
        <>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
                value={selectedRol}
                onChange={handleSelectedRol}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={loading || error}
            >
                <option value="" disabled>
                    {loading ? 'Cargando roles...' : 'Seleccionar rol de usuario'}
                </option>

                {roles.length > 0 && roles.map(rol => {
                    if (rol.nombre === 'SuperAdmin' && !isSuperAdmin()) return null;
                    return (
                        <option key={rol.id} value={rol.id}>
                            {rol.nombre}
                        </option>
                    );
                })}
                
            </select>
            {error && <p className="text-red-500 text-sm">No se pudieron cargar los roles.</p>}
            {selectedRol.length === 0 && errors && <p className="text-red-500 text-sm">{errors}</p>}
        </>
    );
};
