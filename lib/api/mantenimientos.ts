import apiClient from "./client";
import type { Mantenimiento } from "@/types/mantenimientos.types";

interface CreateMantenimientoRequest {
  tipoTrabajo: "Mantenimiento";
  fechaCreacion: string;
  idUbicacionTecnica: number;
  idGrupo: number;
  prioridad: "Alta" | "Media" | "Baja";
  fechaLimite: string;
  frecuencia: "Diaria" | "Semanal" | "Mensual" | "Bimestral" | "Trimestral" | "Semestral" | "Anual";
  tipoMantenimiento: "Periodico" | "Condicion";
  especificacion: string;
}

interface MantenimientosResponse {
    data: Mantenimiento[];
}

export const mantenimientosAPI = {
    async getAll(): Promise<MantenimientosResponse> {
        return apiClient.get<MantenimientosResponse>('/mantenimientos');
    },

    async create(data: CreateMantenimientoRequest): Promise<Mantenimiento> {
        return apiClient.post<Mantenimiento>('/work-creation', data); 
    }
}