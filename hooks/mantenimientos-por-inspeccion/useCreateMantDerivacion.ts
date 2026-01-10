import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mantenimientoInspecionAPI, mantenimientosXInspeccion } from "@/lib/api/mantenimientosInspeccion";
import { toast } from "react-hot-toast";

export const useCreateMantPorInspeccion = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: mantenimientosXInspeccion) =>
            mantenimientoInspecionAPI.derivarMantenimiento(
                data.id,
                data.nombre
            ),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['mantenimientos-inspeccion']
            })
            queryClient.invalidateQueries({
                queryKey: ["Inspeccion", "detalle", variables.id]
            })
            toast.success("Mantenimiento creado exitosamente!");
        },
        onError: () => {
            toast.error("Error al crear el mantenimiento");
        }
    })
}
