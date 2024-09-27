import { MantineTable } from '@components/common';
import ApoderadosModalForm from './ApoderadoModalForm';
import RemoveApoderado from './RemoveApoderado';
import { Apoderado } from '@src/types/club/cadete';

const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'nombre',
        header: 'Nombre',
    },
    {
        accessorKey: 'apellido',
        header: 'Apellido',
    },
    {
        accessorKey: 'relacion',
        header: 'Relación',
    },
];

interface RowType {
    original: Apoderado;
}

const ApoderadosTable = ({ apoderados }: { apoderados?: Apoderado[] }) => {

    const renderRowActions = ({ row }: { row: RowType }) => (
        <div className='flex justify-center gap-2'>
            <ApoderadosModalForm apoderado={row.original} />
            <RemoveApoderado apoderadoId={row.original.id} />
        </div>
    );

    return (
        <>
            {
                apoderados ? (
                    <MantineTable
                        columns={columns}
                        data={apoderados}
                        renderRowActions={renderRowActions}
                    />
                ) : (
                    'No hay apoderados'
                )
            }
        </>
    );
}

export default ApoderadosTable;