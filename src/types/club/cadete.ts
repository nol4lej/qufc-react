import { Categoria, Posicion } from "../club";
import { Ciudad, Region } from "../common/regiones";

export interface Cadete {
    readonly id?: string;
    nombre: string;
    apellido: string;
    rut: string;
    fecha_nacimiento?: Date;
    email?: string;
    telefono?: number;
    region?: Region['nombre'];
    ciudad?: Ciudad['nombre'];
    direccion?: string;
    club: string;
    estado: Estado;
    url_foto?: string;
    fecha_admision?: Date;
    fecha_salida?: Date;
    readonly creado_en: Date;
    readonly actualizado_en: Date;
    apoderados?: Apoderado[];
    fichas_tecnicas?: FichaTecnica[];
}

export interface Apoderado {
    readonly id: string;
    nombre: string;
    apellido: string;
    rut: string;
    email: string;
    telefono: number;
    region?: Region['nombre'];
    ciudad?: Ciudad['nombre'];
    direccion: string;
    relacion: Relacion;
    id_cadete: Cadete["id"]; // FK a Cadete
    estado: Estado;
    readonly creado_en: Date;
    actualizado_en: Date;
}

export interface FichaTecnica {
    readonly id: string;
    club: string;
    categoria: Categoria; // FK a Categoria
    posicion: Posicion; // FK a Posicion
    goles: number;
    asistencias: number;
    id_cadete: Cadete["id"]; // FK a Cadete
    readonly creado_en: Date;
    actualizado_en: Date;
}

export enum Estado {
    ACTIVO = 'ACTIVO',
    INACTIVO = 'INACTIVO'
}

enum Relacion {
    MADRE = "Madre",
    PADRE = "Padre",
    TUTOR = "Tutor",
    ABUELA = "Abuela",
    ABUELO = "Abuelo",
    HERMANA = "Hermana",
    HERMANO = "Hermano",
    TIA = "Tía",
    TIO = "Tío",
    FAMILIAR_CERCANO = "Familiar cercano"
}