import type { Actividad } from "@/types/checklist.types";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChecklistItem } from "@/lib/api/checklist";

type CreateParams = {
    checklistId: number;
    data: Actividad;
};

export const useCreateChecklistItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ checklistId, data }: CreateParams) => 
            createChecklistItem(checklistId, data),

        onSuccess: () => {
            toast.success("Actividad creada exitosamente");
            queryClient.invalidateQueries({ queryKey: ["checklistItems"] });
        },
        onError: (error) => {
            console.error("Error al crear:", error);
            toast.error("Error al crear la actividad");
        }
    });
}