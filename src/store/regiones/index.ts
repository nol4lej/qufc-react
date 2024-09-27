import { create } from "zustand";
import { regiones } from "@lib/regiones";
import { Ciudad, Region } from "@src/types/common";

type RegionesStore = {
    regiones: Region[];
    ciudades: Ciudad[];
    setCiudades: (ciudades: Ciudad[]) => void;
}

export const useRegionesStore = create<RegionesStore>((set) => ({
    regiones: regiones,
    ciudades: [],
    setCiudades: (newCiudades: Ciudad[]) => {
        set(() => ({
            ciudades: newCiudades,
        }));
    },
}));