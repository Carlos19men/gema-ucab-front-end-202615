'use client'

import { apiClient } from "@/lib/api/client";
import { MantenimientoInspeccion } from "@/types/mantenimientoInspeccion";

export interface mantenimientosXInspeccion {
  id: number;
  nombre: string;
}


/**
 * Deriva un mantenimiento desde una inspección
 * POST /mantenimientosXinspeccion
 * @param idInspeccion - ID de la inspección de la cual derivar
 * @param nombre - Nombre del mantenimiento a crear
 */
export const mantenimientoInspecionAPI = {
  async getAll(): Promise<MantenimientoInspeccion[]> {
    return apiClient.get<MantenimientoInspeccion[]>("/mantenimientosXinspeccion/resumen")
  },

  async derivarMantenimiento(idInspeccion: number, nombre: string) {
    return apiClient.post<{ idMantenimiento: number; nombre: string; idInspeccion: number }>(
      "/mantenimientosXinspeccion",
      { idInspeccion, nombre }
    );
  },

}
