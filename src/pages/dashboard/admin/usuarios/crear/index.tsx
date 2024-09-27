import { UsuarioForm } from "@components/Club/Usuarios";
import { SectionComponent } from "@components/common";

export function AdminCrearUsuario() {
    return (
        <SectionComponent title="Registrar Usuario">
            <UsuarioForm />
        </SectionComponent>
    )
}