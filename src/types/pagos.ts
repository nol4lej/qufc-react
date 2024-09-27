import { Cadete } from "./club/cadete";

export enum EstadoPago {
    PENDIENTE = 'PENDIENTE',
    COMPLETADO = 'COMPLETADO',
    FALLIDO = 'FALLIDO'
}

export enum MetodoPago {
    TARJETA = 'TARJETA',
    TRANSFERENCIA = 'TRANSFERENCIA',
    EFECTIVO = 'EFECTIVO'
}

export interface Pago {
    readonly id: string;
    cadete_id: Cadete["id"];
    fecha_pago: Date;
    monto: number;
    estado: EstadoPago;
    metodo_pago: MetodoPago;
    readonly creado_en: Date;
    actualizado_en: Date;
}
