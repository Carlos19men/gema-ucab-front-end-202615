'use client'

import { apiClient } from "@/lib/api/client";

import type {
    mantenimientosReabiertos,
    mantenimientosReabiertosPorArea,
    mantenimientosResumenMesActual,
    mantenimientosActivosPorArea
} from "@/types/estadisticas.types";

type mantenimientosReabiertosResponse = number;

type mantenimientosReabiertosPorAreaResponse = {
    Grupo: string;
    Total: number;  
}[];

type mantenimientosResumenMesActualResponse = {
    Total: number;
    Finalizados: number;
    PorcentajeFinalizados: number;
};

type mantenimientosActivosPorAreaResponse = {
    Grupo: string;
    Total: number;  
}[];

export const normalizeMantenimientosReabiertosPorArea = (
    data?: mantenimientosReabiertosPorAreaResponse | null
): mantenimientosReabiertosPorArea | null => {
    if (!data) {
        return null;
    }
    return data.map(item => ({
        Grupo: item.Grupo,
        Total: item.Total
    }));
}

export const normalizeMantenimientosResumenMesActual = (
    data?: mantenimientosResumenMesActualResponse | null
): mantenimientosResumenMesActual | null => {
    if (!data) {
        return null;
    }
    return {
        Total: data.Total,
        Finalizados: data.Finalizados,
        PorcentajeFinalizados: data.PorcentajeFinalizados
    };
}

export const normalizeMantenimientosActivosPorArea = (
    data?: mantenimientosActivosPorAreaResponse | null
): mantenimientosActivosPorArea | null => {
    if (!data) {
        return null;
    }
    return data.map(item => ({
        Grupo: item.Grupo,
        Total: item.Total
    }));
}

export async function getMantenimientosReabiertos(): Promise<mantenimientosReabiertos | null>  {
    const response = await apiClient.get<mantenimientosReabiertosResponse | null>(
        `/trabajos/reabiertos`
      );
      console.log('Respuesta de mantenimientos reabiertos:', response);
      return response ?? null;

}

export async function getMantenimientosReabiertosPorArea(): Promise<mantenimientosReabiertosPorArea | null> {
    const response = await apiClient.get<mantenimientosReabiertosPorAreaResponse>('/trabajos/reabiertos/por-area');
    console.log('Respuesta de mantenimientos reabiertos por área:', response);
    return normalizeMantenimientosReabiertosPorArea(response);
}

export async function getMantenimientosResumenMesActual(): Promise<mantenimientosResumenMesActual | null> {
    const response = await apiClient.get<mantenimientosResumenMesActualResponse>('/trabajos/resumen/mes-actual');
    console.log('Respuesta de mantenimientos resumen mes actual:', response);
    return normalizeMantenimientosResumenMesActual(response);
}

export async function getMantenimientosActivosPorArea(): Promise<mantenimientosActivosPorArea | null> {
    const response = await apiClient.get<mantenimientosActivosPorAreaResponse>('/trabajos/activos/por-area');
    console.log('Respuesta de mantenimientos activos por área:', response);
    return normalizeMantenimientosActivosPorArea(response);
}