export type mantenimientosReprogramados = number;

export type mantenimientosReprogramadosPorArea = {
    Grupo: string;
    Total: number;
}[];

export type mantenimientosResumenMesActual = {
    culminados: number;
    porcentajeCulminados: number;
    totalMantenimientos: number;
};

export type mantenimientosEmpezadosPorArea = {
    Grupo: string;
    Total: number;
}[];
