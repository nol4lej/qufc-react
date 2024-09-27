import { MantineTable } from "@components/common"
import { getColorByEstado, mountFormatter, emptyCellFormatter } from "@lib/formatters";
import { EstadoPago, Pago } from "@src/types/pagos"
import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";

const columns: MRT_ColumnDef<Pago>[] = [
    {
        accessorKey: 'estado',
        header: 'Estado',
        Cell: ({ cell }: { cell: MRT_Cell<Pago> }) => {
            const estado = cell.getValue() as EstadoPago
            const color = getColorByEstado(estado)
            return <span style={{ color, fontWeight: 500 }}>{estado}</span>;
        },
    },
    {
        accessorKey: 'creado_en',
        header: 'Fecha de creación'
    },
    {
        accessorKey: 'monto',
        header: 'Monto',
        Cell: ({ cell }: { cell: MRT_Cell<Pago> }) => {
            const monto = Number(cell.getValue());
            const fixedMonto = mountFormatter(monto);
            return fixedMonto;
        }
    },
    {
        accessorKey: 'fecha_pago',
        header: 'Fecha de pago',
        Cell: ({ cell }: { cell: MRT_Cell<Pago> }) => {
            return emptyCellFormatter(cell.getValue());
        }
    },
    {
        accessorKey: 'metodo_pago',
        header: 'Método de pago',
        Cell: ({ cell }: { cell: MRT_Cell<Pago> }) => {
            return emptyCellFormatter(cell.getValue());
        }
    },
]

const SituacionFinancieratTable = ({ pagos }: { pagos: Pago[] }) => {
    return (
        <>
            {
                pagos ? (
                    <MantineTable
                        columns={columns}
                        data={pagos}
                    />
                ) : (
                    'No hay pagos disponibles'
                )
            }
        </>
    )
}

export default SituacionFinancieratTable