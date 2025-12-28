import { useQuery } from "@tanstack/react-query";
import { mantenimientosAPI } from "@/lib/api/mantenimientos";

export const useMantenimientosFiltros = (date: string, filter: string = 'mensual') => {
    return useQuery({
        queryKey: ["mantenimientos", "filtros", date, filter],
        queryFn: () => mantenimientosAPI.getFiltros(date, filter),
        select: (data) => {
            // El API devuelve el array directamente, no envuelto en {data: [...]}
            return Array.isArray(data) ? data : data?.data || [];
        },
    });
};
