import { useQuery } from "@tanstack/react-query";
import { getPlantillaById } from "@/lib/plantillas";

export const useGetPlantillaById = (id: number) => {
    return useQuery({
        queryKey: ["plantilla", id],
        queryFn: () => getPlantillaById(id),
        enabled: !!id, // Solo ejecutar si hay un ID válido
    });
};
