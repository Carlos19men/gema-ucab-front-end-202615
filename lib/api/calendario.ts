import apiClient from "./client";

// Tipos para el calendario
export interface EventoCalendario {
  id: number;
  titulo: string;
  fecha: string;
  tipo: "Mantenimiento" | "Inspeccion";
  prioridad: "Alta" | "Media" | "Baja";
  estado: string;
  ubicacionTecnica?: string;
  supervisor?: string;
  grupo?: string;
}

export interface CalendarioResponse {
  data: EventoCalendario[];
}

export type FiltroCalendario = "mensual" | "semanal";

export const calendarioAPI = {
  /**
   * Obtiene los eventos del calendario (mantenimientos e inspecciones) para una fecha y filtro específicos
   * @param date - Fecha en formato YYYY-MM-DD
   * @param filter - Tipo de filtro: "mensual" o "semanal"
   */
  async getEventos(date: string, filter: FiltroCalendario): Promise<CalendarioResponse> {
    console.log(`🔄 [CALENDARIO] Obteniendo eventos para fecha: ${date}, filtro: ${filter}`);
    
    try {
      const response = await apiClient.get<CalendarioResponse>(`/calendario?date=${date}&filter=${filter}`);
      console.log(`✅ [CALENDARIO] Eventos obtenidos exitosamente:`, response);
      return response;
    } catch (error) {
      console.error(`❌ [CALENDARIO] Error al obtener eventos:`, error);
      throw error;
    }
  },

  /**
   * Obtiene eventos mensuales para una fecha específica
   * @param date - Fecha en formato YYYY-MM-DD
   */
  async getEventosMensuales(date: string): Promise<CalendarioResponse> {
    return this.getEventos(date, "mensual");
  },

  /**
   * Obtiene eventos semanales para una fecha específica
   * @param date - Fecha en formato YYYY-MM-DD
   */
  async getEventosSemanales(date: string): Promise<CalendarioResponse> {
    return this.getEventos(date, "semanal");
  }
};