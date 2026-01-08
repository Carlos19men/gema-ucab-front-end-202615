'use client';

import { useSearchParams, useRouter } from "next/navigation";
import ChecklistComponent from "@/components/checklist/checklist";
import type { Checklist } from "@/types/checklist.types";
import { LoaderCircle } from "lucide-react";
import { useGetPlantillaById } from "@/hooks/plantillas/useGetPlantillaById";

const ChecklistPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plantillaId = searchParams.get('id');

  const { data: plantilla, isLoading, isError } = useGetPlantillaById(Number(plantillaId));

  const handleBack = () => {
    router.push('/plantillas');
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[400px]">
        <LoaderCircle className="animate-spin h-8 w-8 text-gema-green" />
      </div>
    );
  }

  if (isError || !plantilla) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{!plantillaId ? "No se especificó una plantilla" : "Error al cargar la plantilla"}</p>
        <button
          onClick={handleBack}
          className="text-gema-green hover:underline"
        >
          Volver a Plantillas
        </button>
      </div>
    );
  }

  // Transformar la plantilla al formato Checklist
  const checklistData: Checklist = {
    id: plantilla.id,
    idTrabajo: 0, // Dummy ID para vista de plantilla
    titulo: plantilla.plantilla,
    ubicacion: "Ubicación por definir",
    tareas: plantilla.actividades || []
  };

  return (
    <div>
      <ChecklistComponent
        checklist={checklistData}
        onBack={handleBack}
        isTemplate={true}
        idTrabajo={0}
      />
    </div>
  )
}

export default ChecklistPage;