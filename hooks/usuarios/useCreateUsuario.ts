import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { crearUsuario, UsuarioResponse } from "@/services/usuarios";

export const useCreateUsuario = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: UsuarioResponse) => crearUsuario(user),
        onSuccess: () => {
            toast.success("Usuario creado exitosamente");
            queryClient.invalidateQueries({ queryKey: ["usuarios"] });
        },
        onError: (error) => {
            console.error(error);
            toast.error("Error al crear usuario");
        },
    });
};