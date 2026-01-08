"use client"

import type { Plantillas } from "@/types/plantillas.types";
import apiClient from "./client";

export async function getPlantillas() {
    return apiClient.get<Plantillas>("/plantillas");
}

export async function createPlantillaItem(plantillaId: number, data: { nombre: string, descripcion: string, estado?: string }) {
    const payload = {
        idPlantilla: plantillaId,
        titulo: data.nombre,
        descripcion: data.descripcion,
        estado: data.estado
    };
    return apiClient.post("/item-plantilla", payload);
}

export async function updatePlantillaItem(plantillaId: number, itemId: number, data: { nombre: string, descripcion: string, estado?: string }) {
    const payload = {
        titulo: data.nombre,
        descripcion: data.descripcion,
        estado: data.estado
    };
    return apiClient.put(`/item-plantilla/${itemId}/plantilla/${plantillaId}`, payload);
}

export async function deletePlantillaItem(plantillaId: number, itemId: number) {
    return apiClient.delete(`/item-plantilla/${itemId}/plantilla/${plantillaId}`);
}