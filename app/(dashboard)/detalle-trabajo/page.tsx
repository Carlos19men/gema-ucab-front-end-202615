'use client';

import ChecklistComponent from "@/components/checklist/checklist";
import { useGetAllChecklistItem } from "@/hooks/checklist/useGetAllChecklistItem";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ChecklistPage = () => {
  //Obtener el ID de la URL. Ejemplo: /detalle-trabajo?id=1&type=mantenimientos
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const typeParam = searchParams.get('type') as string;

  const id = idParam ? Number(idParam) : 0; 
  const type = typeParam || "mantenimientos"; 

  //Usar el hook para traer los datos del Backend
  const { data: checklist, isLoading, isError } = useGetAllChecklistItem(type,id);

  // Estado para controlar qué vista mostrar
  // false = Muestra el detalle general
  // true = Muestra la pantalla de checklist (tareas)
  const [showChecklist, setShowChecklist] = useState(false);

  //Manejo de estados de carga y error
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gema-green">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  }

  // Si hay error o si la data llegó vacía (undefined) o si el id es invalido
  if (isError || !checklist || id === 0) { // [!code ++]
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>No se pudo cargar la información del checklist o el ID es inválido.</p>
      </div>
    );
  }

  return (
        <div>
            <ChecklistComponent 
              idTrabajo={checklist.idTrabajo}
              checklist={checklist} 
              onBack={() => setShowChecklist(false)} // Función para volver 
            />
        </div>
    )
}

export default ChecklistPage;