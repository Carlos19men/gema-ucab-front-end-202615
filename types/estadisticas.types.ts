export type mantenimientosReabiertos = number;

export type mantenimientosReabiertosPorArea = {
    Grupo: string;
    Total: number;
}[];

export type mantenimientosResumenMesActual = {
    Total: number;
    Finalizados: number;
    PorcentajeFinalizados: number;
};

export type mantenimientosActivosPorArea = {
    Grupo: string;
    Total: number;
}[];
