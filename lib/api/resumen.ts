import type { resumen } from "@/types/resume.types";
import { apiClient } from "@/lib/api/client";

export async function getResumen(date: string, filter: "mensual" | "semanal"){
    return await apiClient.get<resumen>(`/calendario?date=${date}&filter=${filter}`);
} 