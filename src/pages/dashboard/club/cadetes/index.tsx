import CadetesTable from '@components/Club/Cadetes/CadetesTable'
import { BoxComponent } from '@components/common/BoxComponent'
import { SectionComponent } from '@components/common/SectionComponent'

export function ListadoDeCadete() {

    return (
        <SectionComponent title="Listado de Cadetes">
            <BoxComponent>
                <CadetesTable />
            </BoxComponent>
        </SectionComponent>
    )
}