import { useQuery } from "@tanstack/react-query";
import { getMantenimientosReprogramados, getMantenimientosEmpezadosPorArea,getMantenimientosReprogramadosPorArea,getMantenimientosResumenMesActual } from "@/services/estadisticas";

export const useMantenimientosReprogramados = () => {
  return useQuery({
    queryKey: ["estadisticas", "mantenimientosReprogramados"],
    queryFn: getMantenimientosReprogramados
  });
}

export const useMantenimientosReprogramadosPorArea = () => {
  return useQuery({
    queryKey: ["estadisticas", "mantenimientosReprogramadosPorArea"],
    queryFn: getMantenimientosReprogramadosPorArea
  });
}

export const useMantenimientosResumenMesActual = () => {
  return useQuery({
    queryKey: ["estadisticas", "mantenimientosResumenMesActual"],
    queryFn: getMantenimientosResumenMesActual
  });
}
export const useMantenimientosEmpezadosPorArea = () => {
  return useQuery({
    queryKey: ["estadisticas", "mantenimientosEmpezadosPorArea"],
    queryFn: getMantenimientosEmpezadosPorArea
  });
}

