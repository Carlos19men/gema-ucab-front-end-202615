import { ResumenInspeccion } from "@/types/resumenInspeccion.types";
import apiClient from "./client";

interface inspeccionRequest {
    data: ResumenInspeccion[]
}

export const InspeccionAPI = {
    async getDetalle(id: number): Promise<any> {
        return apiClient.get<ResumenInspeccion>(`/inspecciones/${id}`);
    },

    async delete(id: number): Promise<any> {
        return apiClient.delete<any>(`/inspecciones/${id}`);
    }
}