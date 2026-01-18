// lib/validations/grupoTrabajoSchema.ts
import { z } from "zod";

export const grupoTrabajoSchema = z.object({
  codigo: z
    .string()
    .min(1, "El código es requerido")
    .min(3, "El código debe tener al menos 3 caracteres")
    .max(10, "El código debe tener máximo 10 caracteres"),
  
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(40, "El nombre no puede exceder los 40 caracteres"),
  
  supervisor: z
    .string()
    .min(1, "El supervisor es requerido"),
    
  area: z
    .string()
    .min(1, "El área es requerida"),
});

export type GrupoTrabajoForm = z.infer<typeof grupoTrabajoSchema>;