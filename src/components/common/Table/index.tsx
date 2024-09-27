import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { ReactNode, useMemo } from 'react';

interface TableProps<T extends Record<string, any>> {
    columns: MRT_ColumnDef<T>[];
    data: T[];
    renderRowActions?: ({ row }: { row: any }) => ReactNode;
}

/**
 * Componente MantineTable
 * 
 * @template T
 * @param {TableProps<T>} props - Propiedades para el componente de la tabla
 * @param {ColumnProps[]} props.columns - Array de objetos de columna con propiedades accessorKey y header
 * @param {T[]} props.data - Array de objetos de datos a mostrar en la tabla
 * @param {function({row: any}): React.ReactNode} [props.renderRowActions] - Función opcional para renderizar acciones en las filas
 * @returns
 */
export function MantineTable<T extends Record<string, any>>({
    columns,
    data,
    renderRowActions
}: TableProps<T>) {

    // Memoiza las columnas para evitar re-renders innecesarios
    const memoColumns = useMemo(
        () => columns,
        [columns],
    );

    const tableOptions = useMemo(() => {
        const options: any = {
            columns: memoColumns,
            data,
            enableGlobalFilterModes: true,
            positionGlobalFilter: "left",
            initialState: {
                showGlobalFilter: true,
            },
            mantineSearchTextInputProps: {
                placeholder: `Search ${data?.length} rows`,
                sx: { minWidth: '300px' },
                variant: 'filled',
            },
        };

        if (renderRowActions) {
            options.enableRowActions = true;
            options.positionActionsColumn = 'last'
            options.renderRowActions = renderRowActions;
        }

        return options;
    }, [memoColumns, data, renderRowActions]);

    const table = useMantineReactTable(tableOptions);

    return (
        <>
            {
                data ? (
                    <MantineReactTable table={table} />
                ) : (
                    <p>No se han encontrado datos</p>
                )
            }
        </>

    );
}
