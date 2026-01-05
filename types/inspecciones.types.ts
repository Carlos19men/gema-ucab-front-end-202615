export type Inspeccion = {
    Id: number;
    Titulo?: string; 
    FechaCreacion: Date;
    Ubicacion: string;
    Estado: "NO EMPEZADO" | "EN EJECUCION" | "REPROGRAMADO" | "CULMINADO";
    Supervisor: string;
    Observaciones: string;
    Frecuencia: string;
    AreaEncargada: string;
};