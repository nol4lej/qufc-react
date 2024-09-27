export interface Ciudad {
    id: string;
    nombre: string;
}

export interface Region {
    id: number;
    nombre: string;
    capital: string;
    ciudades: Ciudad[];
}
