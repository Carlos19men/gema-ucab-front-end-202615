import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { mantenimientosAPI } from "@/lib/api/mantenimientos";

export const useCreateMantenimiento = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: mantenimientosAPI.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mantenimientos"] }); 
            toast.success("Mantenimiento creado correctamente"); 
        },
        onError: (error: any) => {
            console.error("Error al crear mantenimiento:", error); 
            toast.error("Error al crear el mantenimiento"); 
        },
    }); 
}; 
