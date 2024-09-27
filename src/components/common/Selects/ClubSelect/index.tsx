import { useEffect, useState } from 'react';
import { GET_CLUBS } from '@config/envs';
import { useAxiosClient } from '@services/axios';
import { useClubsStore } from '@store/clubs';
import { Club } from '@src/types/club';

interface ClubSelectProps {
    errors: string;
    selectedClub: Club["nombre"];
    handleSelectedClub: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ClubSelect = ({ errors, handleSelectedClub, selectedClub }: ClubSelectProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const axios = useAxiosClient();
    const { clubs, setClubs } = useClubsStore();

    useEffect(() => {
        if (clubs.length === 0) {
            const fetchClubes = async () => {
                try {
                    setLoading(true)
                    const response = await axios.get<Club[]>(GET_CLUBS);
                    setClubs(response.data);
                } catch (error) {
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };
            fetchClubes();
        }
    }, [setClubs, axios, clubs]);

    return (
        <>
            <label className="block text-sm font-medium text-gray-700">Club</label>
            <select
                onChange={handleSelectedClub}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={loading || error}
                value={selectedClub}
            >
                <option value="" disabled>
                    {loading ? 'Cargando clubes...' : 'Seleccionar club de usuario'}
                </option>
                {clubs.length > 0 && (
                    clubs.map(club => (
                        <option key={club.id} value={club.nombre}>
                            {club.nombre}
                        </option>
                    ))
                )}
            </select>
            {error && <p className="text-red-500 text-sm">No se pudieron cargar los clubes.</p>}
            {selectedClub.length === 0 && errors && <p className="text-red-500 text-sm">{errors}</p>}
        </>
    );
};
