import { z } from "zod"; 

/**
 * Schema para validar los datos de un mantenimiento preventivo
 * @description Utiliza Zod para definir las reglas de validación basadas en los tipos del backend.
 */
export const mantenimientoSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre del mantenimiento es requerido")
    .max(255, "El nombre no puede exceder 255 caracteres"),
  
  prioridad: z
    .enum(["Alta", "Media", "Baja"])
    .refine((val) => ["Alta", "Media", "Baja"].includes(val), {
      message: "Selecciona una prioridad válida"
    }),
  
  estado: z
    .enum(["no_empezado", "reprogramado", "en_ejecucion", "culminado"])
    .refine((val) => ["no_empezado", "reprogramado", "en_ejecucion", "culminado"].includes(val), {
      message: "Selecciona un estado válido"
    }),
  
  supervisor: z
    .string()
    .min(1, "Selecciona un supervisor"),
  
  fechaInicio: z
    .string()
    .min(1, "La fecha de inicio es requerida"),
  
  fechaFin: z
    .string()
    .min(1, "La fecha de finalización es requerida"),
  
  tipoMantenimiento: z
    .enum(["Periodico", "Condicion"])
    .refine((val) => ["Periodico", "Condicion"].includes(val), {
      message: "Selecciona un tipo de mantenimiento válido"
    }),
  
  repeticion: z
    .enum(["unico", "periodico"])
    .refine((val) => ["unico", "periodico"].includes(val), {
      message: "Selecciona un tipo de repetición válido"
    }),
  
  frecuencia: z
    .enum(["Diaria", "Semanal", "Mensual", "Bimestral", "Trimestral", "Semestral", "Anual"])
    .optional(),
  
  idUbicacionTecnica: z
    .number()
    .min(1, "Selecciona una ubicación técnica"),
  
  idGrupo: z
    .number()
    .min(1, "Selecciona un grupo de trabajo"),
  
  especificacion: z
    .string()
    .min(1, "La especificación es requerida")
    .max(1000, "La especificación no puede exceder 1000 caracteres")
});

export type MantenimientoFormData = z.infer<typeof mantenimientoSchema>;