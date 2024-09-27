import { Club } from "../club";
import { Cadete } from "../club/cadete";
import { Estado } from "../common";

export interface Usuario {
    id?: string;
    nombre: string;
    segundo_nombre: string;
    apellido_paterno: string;
    rut: string;
    estado?: Estado;
    created_at?: Date;
    updated_at?: Date;
    rol: Rol;
    subroles?: Subrol[];
    club: Club["nombre"];
    perfil?: Cadete;
}

export interface Rol {
    id: string;
    nombre: string;
    estado?: Estado;
    created_at?: Date;
    updated_at?: Date;
}

export interface Subrol {
    id: string;
    nombre: string;
    estado?: Estado;
    created_at?: Date;
    updated_at?: Date;
}