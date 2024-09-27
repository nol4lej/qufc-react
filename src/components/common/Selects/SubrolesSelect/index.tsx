import { Subrol } from "@src/types/usuario";
import { useEffect, useState } from 'react';
import { ALL_SUBROLES } from '@config/envs';
import { useAxiosClient } from '@services/axios';
import { useRolesStore } from '@store/roles';

interface SubRolesSelectProps {
    selectedSubRoles: Subrol["id"][];
    handleSelectedSubRol: (selectedSubRoles: Subrol["id"][]) => void;
    errors: string;
}

export const SubrolesSelect = ({ selectedSubRoles, handleSelectedSubRol, errors }: SubRolesSelectProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const axios = useAxiosClient();
    const { subroles, setSubRoles } = useRolesStore();

    useEffect(() => {
        if (subroles.length === 0) {
            const fetchRoles = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get<Subrol[]>(ALL_SUBROLES);
                    setSubRoles(response.data);
                } catch (error) {
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };
            fetchRoles();
        }
    }, [setSubRoles, axios, subroles]);

    const handleAddSubRol = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const subrolId = event.target.value;
        if (subrolId && !selectedSubRoles.includes(subrolId)) {
            handleSelectedSubRol([...selectedSubRoles, subrolId]);
        }
    };

    const handleRemoveSubRol = (subrolId: Subrol["id"]) => {
        handleSelectedSubRol(selectedSubRoles.filter(id => id !== subrolId));
    };

    return (
        <>
            <label className="block text-sm font-medium text-gray-700">Subrol</label>
            <select
                onChange={handleAddSubRol}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={loading || error}
                value=""
            >
                <option value="" disabled>
                    {loading ? 'Cargando roles...' : 'Agregar subrol de usuario'}
                </option>
                {subroles.length > 0 && (
                    subroles.map(subrol => (
                        <option key={subrol.id} value={subrol.id} data-nombre={subrol.nombre}>
                            {subrol.nombre}
                        </option>
                    ))
                )}
            </select>
            {error && <p className="text-red-500 text-sm">No se pudieron cargar los subroles.</p>}
            {errors && <p className="text-red-500 text-sm">{errors}</p>}

            <ul className="mt-2">
                {selectedSubRoles.map(subrolId => {
                    const subrol = subroles.find(s => s.id === subrolId);
                    return subrol ? (
                        <li className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-1" key={subrol.id}>
                            <span>{subrol.nombre}</span>
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveSubRol(subrolId)}
                                aria-label={`Eliminar subrol ${subrol.nombre}`}
                            >
                                Eliminar
                            </button>
                        </li>
                    ) : null;
                })}
            </ul>
        </>
    );
};
