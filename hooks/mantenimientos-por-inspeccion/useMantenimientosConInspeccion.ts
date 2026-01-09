import { useQuery } from "@tanstack/react-query";

import { mantenimientoInspecionAPI } from "@/lib/api/mantenimientosInspeccion";

/**
 * Hook para consultar mantenimientos que tienen una inspección asociada
 */
export const useMantenimientosConInspeccion = () => {
    const query = useQuery({
        queryKey: ["mantenimientos-inspeccion"],
        queryFn: mantenimientoInspecionAPI.getAll,
        select: (data) => data ?? [],
    });

    const mantenimientos = query.data ?? [];

    return {
        ...query,
        mantenimientos,
        isEmpty: !query.isLoading && mantenimientos.length === 0,
    };
};
