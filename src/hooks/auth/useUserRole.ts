import { useRolesStore } from "@store/roles";
import { useAuth } from "./useAuth";

export const useUserRole = () => {
    const { getUsuarioRol } = useAuth();
    const { getRoles } = useRolesStore();

    const isRoleMatching = (roleToCompare: string) => {
        return roleToCompare === getUsuarioRol?.nombre;
    }

    const isProfesionalRol = (rol_id: string) => {
        const roles = getRoles();
        const rol = roles.find(rol => rol.id === rol_id);
        return rol?.nombre === 'Profesional';
    }

    return {
        isRoleMatching,
        isProfesionalRol,
    }
}
