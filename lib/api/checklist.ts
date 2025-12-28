"use client";

import apiClient from "@/lib/api/client";
import type { Actividad, ApiChecklistResponse, Checklist } from "@/types/checklist.types";

export async function getChecklistItems(checklistId: number) {
  const response = await apiClient.get<ApiChecklistResponse>(`/checklists/${checklistId}`);

  const serverData = response.data;

  const checklistAdaptado: Checklist = {
    id: serverData.idChecklist,
    titulo: serverData.nombre,
    ubicacion: "Ubicación no disponible", 
    tareas: serverData.items.map(item => ({
      id: item.idItemCheck,
      nombre: item.titulo,          
      descripcion: item.descripcion,
      estado: "PENDIENTE"   // Valor por defecto
    }))
  };

  return checklistAdaptado;
}

export async function deleteChecklistItem(checklistId: number,checklistItemId: number) {
  return apiClient.delete(`/item-checklist/${checklistId}/${checklistItemId}`);
}

export async function createChecklist(nombre: string) {
  return apiClient.post<Checklist>(`/checklists`, { nombre });
}

export async function createChecklistItem(checklistId: number, data: Actividad) {
  return apiClient.post<Checklist>(`/item-checklist/${checklistId}/item`, data);
}

export async function updateChecklistItem(checklistId: number, data: Actividad) {
  const payload = {
    idItemCheck: data.id,    // ID con el nombre que espera el backend
    titulo: data.nombre,     // nombre -> titulo
    descripcion: data.descripcion
  };

  // --- AGREGA ESTO PARA ESPIAR ---
  console.log("INTENTANDO ACTUALIZAR:");
  console.log("URL:", `/item-checklist/${checklistId}/${data.id}`);
  console.log("Payload:", payload);
  // -------------------------------

  return apiClient.put<Checklist>(`/item-checklist/${checklistId}/${data.id}`, payload);
}
