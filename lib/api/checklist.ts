"use client";

import apiClient from "@/lib/api/client";
import type { Actividad, Checklist } from "@/types/checklist.types";

export async function getChecklistItems(type: string,checklistId: number) {
  return apiClient.get<Checklist>(`/${type}/${checklistId}/checklist`);
}

export async function deleteChecklistItem(id: number) {
  return apiClient.delete(`/checklist/${id}`);
}

export async function createChecklistItem(data: Actividad) {
  return apiClient.post(`/checklist/${data.id}`, data);
}

export async function updateChecklistItem(data: Actividad) {
  return apiClient.put(`/checklist/${data.id}`, data);
}
