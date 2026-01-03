import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editUsuario, UsuarioResponse } from "@/services/usuarios";

export const useUpdateUsuario = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, user }: { id: number; user: UsuarioResponse }) => editUsuario(id, user),
        onSuccess: () => {
            toast.success("Usuario actualizado exitosamente");
            queryClient.invalidateQueries({ queryKey: ["usuarios"] });
        },
        onError: (error) => {
            toast.error("Error al actualizar usuario");
        },
    });
};