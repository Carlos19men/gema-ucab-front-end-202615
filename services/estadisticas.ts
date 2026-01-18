'use client'

import { apiClient } from "@/lib/api/client";

import type {
    mantenimientosReprogramados,
    mantenimientosReprogramadosPorArea,
    mantenimientosResumenMesActual,
    mantenimientosEmpezadosPorArea
} from "@/types/estadisticas.types";

type mantenimientosReprogramadosResponse = number;

type mantenimientosReprogramadosPorAreaResponse = {
    Grupo: string;
    total: number;  
}[];

type mantenimientosResumenMesActualResponse = {
    culminados: number;
    porcentajeculminados: number;
    totalMantenimientos: number;
};

type mantenimientosEmpezadosPorAreaResponse = {
    grupo: string;
    total: number;  
}[];

export const normalizeMantenimientosReprogramadosPorArea = (
    data?: mantenimientosReprogramadosPorAreaResponse | null
): mantenimientosReprogramadosPorArea | null => {
    if (!data) {
        return null;
    }
    return ( 
        data.map(item => ({  
        Grupo: item.Grupo,
        Total: item.total,
 
    } ))
    
       );
}

export const normalizeMantenimientosResumenMesActual = (
    data?: mantenimientosResumenMesActualResponse | null
): mantenimientosResumenMesActual | null => {
    if (!data) {
        return null;
    }
    return (
        {
        totalMantenimientos: data.totalMantenimientos,
        culminados: data.culminados,
        porcentajeCulminados: data.porcentajeculminados
    });
}

export const normalizeMantenimientosEmpezadosPorArea = (
    data?: mantenimientosEmpezadosPorAreaResponse | null
): mantenimientosEmpezadosPorArea | null => {
    
    if (!data) {
        return null;
    }
    return (     

        data.map(item => ({
        Grupo: item.grupo,
        Total: item.total,
    })));
}

export async function getMantenimientosReprogramados(): Promise<mantenimientosReprogramados | null>  {
    const response = await apiClient.get<mantenimientosReprogramadosResponse | null>(
        `/trabajos/reprogramados`
      );
      return response ?? null;

}

export async function getMantenimientosReprogramadosPorArea(): Promise<mantenimientosReprogramadosPorArea | null> {
    const response = await apiClient.get<mantenimientosReprogramadosPorAreaResponse>('/trabajos/reprogramados/por-area');

    return(normalizeMantenimientosReprogramadosPorArea(response));
}

export async function getMantenimientosResumenMesActual(): Promise<mantenimientosResumenMesActual | null> {
    const response = await apiClient.get<mantenimientosResumenMesActualResponse>('/trabajos/resumen/mes-actual');
    return normalizeMantenimientosResumenMesActual(response);
}

export async function getMantenimientosEmpezadosPorArea(): Promise<mantenimientosEmpezadosPorArea | null> {
    const response = await apiClient.get<mantenimientosEmpezadosPorAreaResponse>('/trabajos/empezado/por-area');
    return normalizeMantenimientosEmpezadosPorArea(response);
}