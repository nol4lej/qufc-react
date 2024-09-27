import { EstadoPago } from "@src/types/pagos";
import { Estado } from "@src/types/club/cadete";

type EstadosGenerales = Estado | EstadoPago;

export const getColorByEstado = (estado: EstadosGenerales) => {
    switch (estado) {
        case 'FALLIDO':
        case 'INACTIVO':
            return '#FF0000'; // Rojo

        case 'COMPLETADO':
        case 'ACTIVO':
            return '#008000'; // Verde

        case 'PENDIENTE':
            return '#FFA500'; // Naranja
        default:
            break;
    }
}

export const mountFormatter = (mount: number) => {
    return `$${mount.toLocaleString('es-ES')}`;
}

export const emptyCellFormatter = (value: any) => {
    return value ? value : "-";
}

export const formatISODate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
}