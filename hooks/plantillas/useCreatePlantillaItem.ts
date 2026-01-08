import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlantillaItem } from "@/lib/api/plantillas";
import { toast } from "sonner";
import { Actividad } from "@/types/checklist.types";

type CreateParams = {
    plantillaId: number;
    data: Actividad;
};

export const useCreatePlantillaItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ plantillaId, data }: CreateParams) =>
            createPlantillaItem(plantillaId, { nombre: data.nombre, descripcion: data.descripcion, estado: data.estado }),

        onSuccess: async () => {
            toast.success("Actividad de plantilla creada exitosamente");
            await queryClient.invalidateQueries({
                queryKey: ["plantilla"], // Assuming the query key for fetching template details is "plantilla" or similar. Usually it might be ["plantillas"] or specific ["plantilla", id].
            });
            // Also invalidate queries that might reload the page content
            await queryClient.invalidateQueries({
                queryKey: ["plantillas"],
            });
        },
        onError: (error) => {
            console.error("Error al crear item de plantilla:", error);
            toast.error("Error al crear la actividad de la plantilla");
        }
    });
}
