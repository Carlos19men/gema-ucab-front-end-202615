import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { EditMantenimientoRequest } from "@/lib/api/mantenimientos";
import { mantenimientosAPI } from "@/lib/api/mantenimientos";

export const useUpdateMantenimiento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data:EditMantenimientoRequest) => mantenimientosAPI.update(data),
    onSuccess: () => {
      toast.success("Mantenimiento actualizado exitosamente!");
      queryClient.invalidateQueries({ queryKey: ["mantenimientos"] });
      queryClient.invalidateQueries({ queryKey: ["calendario"] });
    },
    onError: () => {
      toast.error("Error al actualizar el mantenimiento");
    },
  });
};