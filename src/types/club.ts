import { Ciudad, Region } from "./common/regiones";

export interface Club {
    readonly id: string;
    nombre: string;
    region?: Region["id"];
    ciudad?: Ciudad["id"];
    readonly creado_en?: Date;
    actualizado_en?: Date;
}

export interface Categoria {
    readonly id: string;
    nombre: string;
    readonly id_club: string;
    readonly creado_en: Date;
    actualizado_en: Date;
}

export interface Posicion {
    readonly id: string;
    nombre: string;
}