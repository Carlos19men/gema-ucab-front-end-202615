export type ResumenInspeccion = { // en realiadad es inspección 
    idInspeccion: number;
    fechaCreacion: string;
    titulo: string;
    supervisor: string;
    areaEncargada: string;
    estado: "No empezado" | "En ejecución" | "Reprogramado" | "Culminado";
    ubicacion: string;
    frecuencia?: string;
    checklist?: string;
};