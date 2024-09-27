import { MantineTable } from '@components/common';
import { getCadetes } from '@services/cadetes';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'url_foto',
        header: 'Foto',
    },
    {
        accessorKey: 'nombre',
        header: 'Nombre',
    },
    {
        accessorKey: 'apellido',
        header: 'Apellido',
    },
];

export default function CadetesTable() {

    const [cadetes, setCadetes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCadetes = async () => {
            try {
                const response = await getCadetes();
                // console.log(response.data);
                setCadetes(response.data);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCadetes();

        return () => {
            setCadetes([]);
        }
    }, []);

    const renderRowActions = ({ row }: { row: any }) => (
        <div>
            <NavLink to={`/dashboard/club/cadetes/editar/${row.original.id}`}>
                <i className="bi bi-pen"></i>
            </NavLink>
        </div>
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <MantineTable
            columns={columns}
            data={cadetes}
            renderRowActions={renderRowActions}
        />
    );
}