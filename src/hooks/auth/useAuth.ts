
import { useAuthStore } from "@store/auth";

export const useAuth = () => {

    const { logged, token, getRol, getClub, getUser } = useAuthStore();

    const checkIsLogged = () => {
        return logged;
    }

    const getToken = () => {
        return token;
    }

    const getUsuarioRol = getRol();

    const getUsuarioClub = getClub();

    const getUsuario = getUser();

    const isSuperAdmin = () => {
        return getUsuarioRol?.nombre === 'SuperAdmin' ? getUsuarioRol : null;
    }

    return {
        checkIsLogged,
        getToken,
        getUsuarioRol,
        getUsuarioClub,
        getUsuario,
        isSuperAdmin,
    }
}