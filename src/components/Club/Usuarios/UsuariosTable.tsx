import { Loader, MantineTable } from '@components/common';
import { useUsuariosTable } from '@hooks/usuarios';
import { formatISODate } from '@lib/formatters';
import { NavLink } from 'react-router-dom';

const columns = [
    {
        accessorKey: 'rut',
        header: 'RUT',
    },
    {
        accessorKey: 'nombres',
        header: 'Nombres',
        Cell: ({ cell }: { cell: any }) => {
            const nombre = cell.row.original.nombre;
            const apellido = cell.row.original.segundo_nombre;
            return `${nombre} ${apellido ?? ''}`;
        }
    },
    {
        accessorKey: 'apellidos',
        header: 'Apellidos',
        Cell: ({ cell }: { cell: any }) => {
            const paterno = cell.row.original.apellido_paterno;
            const materno = cell.row.original.apellido_materno;
            return `${paterno} ${materno ?? ''}`;
        }
    },
    {
        accessorKey: 'rol.nombre',
        header: 'Rol',
    },
    {
        accessorKey: 'club',
        header: 'Club',
    },
    {
        accessorKey: 'estado',
        header: 'Estado',
    },
    {
        accessorKey: 'created_at',
        header: 'Fecha creado',
        Cell: ({ cell }: { cell: any }) => {
            return formatISODate(cell.getValue())
        }
    },
    {
        accessorKey: 'updated_at',
        header: 'Fecha actualizado',
        Cell: ({ cell }: { cell: any }) => {
            return formatISODate(cell.getValue())
        }
    },
];

export function UsuariosTable({ route }: { route: string }) {

    const { data, error, loading } = useUsuariosTable()

    const renderRowActions = ({ row }: { row: any }) => (
        <div className='flex justify-center gap-2'>
            <NavLink to={`/dashboard/${route}/usuarios/editar/${row.original.id}`}
                className='border border-blue-100 hover:border-blue-600 rounded-md px-2 py-1 w-max bg-blue-400 text-white hover:bg-blue-600'>
                <i className="bi bi-pen"></i>
            </NavLink>
            <button className='border border-red-100 hover:border-red-600 rounded-md px-2 py-1 w-max bg-red-400 text-white hover:bg-red-600'>
                <i className="bi bi-trash3"></i>
            </button>
        </div>

    );

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <div>Error: {error}</div>
            ) : data ? (
                <MantineTable
                    columns={columns}
                    data={data}
                    renderRowActions={renderRowActions}
                />
            ) : null}
        </div>
    );
}