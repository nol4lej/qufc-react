import { UsuarioForm } from "@components/Club/Usuarios";
import { SectionComponent } from "@components/common";
import { useParams } from "react-router-dom";

export function AdminEditarUsuario() {

    const { id } = useParams();

    return (
        <SectionComponent title="Editar Usuario">
            <UsuarioForm usuarioId={id} />
        </SectionComponent>
    )
}