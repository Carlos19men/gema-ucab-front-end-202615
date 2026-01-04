import { z } from "zod";

export const inspeccionSchema = z.object({
  estado: z.string().min(1, "El estado es requerido"),
  supervisor: z.string().min(1, "El supervisor es requerido"),
  idUbicacionTecnica: z.number().min(1, "La ubicación técnica es requerida"),
  frecuencia: z.string().min(1, "La frecuencia es requerida"),
  cadaCuanto: z.number().optional(),
  observacion: z.string().min(1, "La observación/especificación es requerida"),
  prioridad: z.string().min(1, "La prioridad es requerida"),
  fechaLimite: z.string().min(1, "La fecha límite es requerida"),
  idGrupo: z.number().min(1, "El grupo de trabajo es requerido"),
});

export type InspeccionFormData = z.infer<typeof inspeccionSchema>;