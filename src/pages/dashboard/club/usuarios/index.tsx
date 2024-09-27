import { UsuariosTable } from '@components/Club/Usuarios'
import { BoxComponent, SectionComponent } from '@components/common'

export function ClubUsuarios() {

    return (
        <SectionComponent title="Listado de Usuarios">
            <BoxComponent>
                <UsuariosTable route='club'/>
            </BoxComponent>
        </SectionComponent>
    )
}