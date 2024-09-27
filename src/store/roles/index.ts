import { Rol, Subrol } from "@src/types/usuario";
import { create } from "zustand";

type RolesStore = {
    roles: Rol[],
    subroles: Subrol[],
    setRoles: (roles: Rol[]) => void;
    setSubRoles: (subroles: Subrol[]) => void;
    getRoles: () => Rol[];
}

export const useRolesStore = create<RolesStore>((set, get) => ({
    roles: [],
    subroles: [],

    setRoles: (roles: Rol[]) => {
        set(() => ({
            roles: roles,
        }));
    },
    setSubRoles: (subroles: Subrol[]) => {
        set(() => ({
            subroles: subroles,
        }));
    },
    getRoles: () => {
        const { roles } = get();
        return roles;
    }
}));