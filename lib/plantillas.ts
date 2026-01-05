'use client'

import type { Plantilla } from "@/types/models/plantillas.types";

// Datos mock de plantillas con sus actividades
const plantillasMock: Plantilla[] = [
  {
    id: 1,
    plantilla: "Plantilla de Checklist - Sistema Eléctrico",
    tipo: "Checklist",
    actividades: [
      { id: 1, nombre: "Verificar voltaje de entrada", descripcion: "Medir voltaje en panel principal", estado: "PENDIENTE" },
      { id: 2, nombre: "Inspeccionar cables y conexiones", descripcion: "Revisar estado de aislamiento", estado: "PENDIENTE" },
      { id: 3, nombre: "Revisar interruptores", descripcion: "Verificar funcionamiento de breakers", estado: "PENDIENTE" },
      { id: 4, nombre: "Comprobar puesta a tierra", descripcion: "Medir resistencia de tierra", estado: "PENDIENTE" },
    ]
  },
  {
    id: 2,
    plantilla: "Plantilla de Mantenimiento - Equipos HVAC",
    tipo: "Mantenimientos por Condición",
    actividades: [
      { id: 1, nombre: "Revisar filtros de aire", descripcion: "Limpiar o reemplazar filtros", estado: "PENDIENTE" },
      { id: 2, nombre: "Verificar nivel de refrigerante", descripcion: "Comprobar presión del sistema", estado: "PENDIENTE" },
      { id: 3, nombre: "Lubricar componentes móviles", descripcion: "Aplicar lubricante en rodamientos", estado: "PENDIENTE" },
    ]
  },
  {
    id: 3,
    plantilla: "Plantilla de Checklist - Seguridad",
    tipo: "Checklist",
    actividades: [
      { id: 1, nombre: "Revisar extintores", descripcion: "Verificar fecha de vencimiento y carga", estado: "PENDIENTE" },
      { id: 2, nombre: "Inspeccionar salidas de emergencia", descripcion: "Comprobar señalización y acceso libre", estado: "PENDIENTE" },
      { id: 3, nombre: "Verificar alarmas contra incendio", descripcion: "Probar funcionamiento de sensores", estado: "PENDIENTE" },
      { id: 4, nombre: "Revisar botiquín de primeros auxilios", descripcion: "Verificar suministros completos", estado: "PENDIENTE" },
      { id: 5, nombre: "Inspeccionar iluminación de emergencia", descripcion: "Comprobar baterías y funcionamiento", estado: "PENDIENTE" },
    ]
  }
];

/**
 * Obtiene listado de plantillas
 */
export async function getPlantillas() {
  // Datos de ejemplo - Reemplazar con llamada al backend cuando esté disponible
  return Promise.resolve({
    data: plantillasMock
  });

  /* Codigo para cuando el backend este disponible:
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No se encontró el token de autenticación");
  }
  
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/plantillas`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!resp.ok) {
    const data = await resp.json();
    throw new Error(data.error || "Error al obtener las plantillas.");
  }
  
  const data = (await resp.json()) as { data: Plantilla[] };
  return data;
  */
}

/**
 * Obtiene una plantilla por su ID
 */
export async function getPlantillaById(id: number): Promise<Plantilla | null> {
  // Datos de ejemplo - Reemplazar con llamada al backend cuando esté disponible
  const plantilla = plantillasMock.find(p => p.id === id);
  return Promise.resolve(plantilla || null);

  /* Codigo para cuando el backend este disponible:
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No se encontró el token de autenticación");
  }
  
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/plantillas/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (!resp.ok) {
    return null;
  }
  
  const data = (await resp.json()) as { data: Plantilla };
  return data.data;
  */
}

/**
 * Crea una nueva plantilla
 */
export async function createPlantilla(data: Omit<Plantilla, "id">) {
  // Simulando llamada al API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...data });
    }, 1000);
  });
}

/**
 * Actualiza una plantilla existente
 */
export async function updatePlantilla(id: number, data: Partial<Plantilla>) {
  // Simulando llamada al API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, ...data });
    }, 1000);
  });
}

/**
 * Elimina una plantilla
 */
export async function deletePlantilla(id: number) {
  // Simulando llamada al API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id });
    }, 1000);
  });
}
