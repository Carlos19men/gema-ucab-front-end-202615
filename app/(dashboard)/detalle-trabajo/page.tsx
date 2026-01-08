'use client';

import { useSearchParams, useRouter } from "next/navigation";
import ChecklistComponent from "@/components/checklist/checklist";
import type { Checklist } from "@/types/checklist.types";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getPlantillaById } from "@/lib/plantillas";

const ChecklistPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plantillaId = searchParams.get('id');

  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlantilla() {
      if (!plantillaId) {
        setError("No se especificó una plantilla");
        setIsLoading(false);
        return;
      }

      try {
        const plantilla = await getPlantillaById(Number(plantillaId));

        if (!plantilla) {
          setError("Plantilla no encontrada");
          setIsLoading(false);
          return;
        }

        // Transformar la plantilla al formato Checklist
        const checklistData: Checklist = {
          id: plantilla.id,
          titulo: plantilla.plantilla,
          ubicacion: "Ubicación por definir",
          tareas: plantilla.actividades || [],
          idTrabajo: 0
        };

        setChecklist(checklistData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error al cargar plantilla:", err);
        setError("Error al cargar la plantilla");
        setIsLoading(false);
      }
    }

    fetchPlantilla();
  }, [plantillaId]);

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
  if (error || !checklist) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error || "Error desconocido"}</p>
        <button
          onClick={handleBack}
          className="text-gema-green hover:underline"
        >
          Volver a Plantillas
        </button>
      </div>
    );
  }
  return (
    <div>
      <ChecklistComponent checklist={checklist} onBack={handleBack} idTrabajo={0} />
    </div>
  )
}

export default ChecklistPage;