import { UsuariosTable } from '@components/Club/Usuarios'
import { BoxComponent, SectionComponent } from '@components/common'

export function AdminUsuarios() {

    return (
        <SectionComponent title="Listado de Usuarios">
            <BoxComponent>
                <UsuariosTable route='admin'/>
            </BoxComponent>
        </SectionComponent>
    )
}