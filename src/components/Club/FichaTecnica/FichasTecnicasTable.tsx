import { MantineTable } from "@components/common"
import { FichaTecnica } from "@src/types/club/cadete"

const columns = [
    {
        accessorKey: 'categoria',
        header: 'Categoría'
    },
    {
        accessorKey: 'posicion',
        header: 'Posición'
    },
    {
        accessorKey: 'goles',
        header: 'Goles'
    },
    {
        accessorKey: 'asistencias',
        header: 'Asistencias'
    },
]

const FichasTecnicasTable = ({ fichasTecnicas }: { fichasTecnicas: FichaTecnica[] }) => {
    return (
        <>
            {
                fichasTecnicas ? (
                    <MantineTable
                        columns={columns}
                        data={fichasTecnicas}
                    />
                ) : (
                    'No hay fichas técnicas'
                )
            }
        </>
    )
}

export default FichasTecnicasTable