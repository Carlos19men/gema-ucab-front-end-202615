export type ResumenMantenimiento = {
    idMantenimiento: number;
    estado: "No empezado" | "En ejecución" | "Reprogramado" | "Culminado";
    ubicacion: string;
    fechaLimite: string;
    titulo: string;
};

export type ResumenMantenimientoList = ResumenMantenimiento[];
