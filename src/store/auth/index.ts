import { Club } from '@src/types/club';
import { Cadete } from '@src/types/club/cadete';
import { Rol, Subrol, Usuario } from '@src/types/usuario';
import { create } from 'zustand';

interface AuthState {
    logged: boolean;
    user: Usuario | null;
    token: string | null;
    rol: Rol | null;
    subroles: Subrol[] | null;
    club: Club | null;
    perfil: Cadete | null;
    setAuth: (user: Usuario, token: string) => void;
    clearAuth: () => void;
    getRol: () => Rol | null;
    getClub: () => Club | null;
    getUser: () => Usuario | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    logged: false,
    user: null,
    token: null,
    rol: null,
    subroles: null,
    club: null,
    perfil: null,

    setAuth: (user: Usuario, token: string) => {
        set({
            logged: true,
            user,
            token,
            rol: user.rol,
            subroles: user.subroles || null,
            club: user.club || null,
            perfil: user.perfil || null,
        });
    },
    clearAuth: () => set({
        logged: false,
        user: null,
        token: null,
        rol: null,
        subroles: null,
        club: null,
        perfil: null,
    }),
    getRol: () => {
        const { rol } = get();
        return rol;
    },
    getClub: () => {
        const { club } = get();
        return club;
    },
    getUser: () => {
        const { user } = get();
        return user;
    }   
}));
