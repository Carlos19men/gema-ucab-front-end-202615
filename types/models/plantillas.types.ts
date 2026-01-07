import type { Actividad } from "@/types/checklist.types";

export type Plantilla = {
  id: number;
  plantilla: string;
  tipo: string;
  actividades?: Actividad[];
};

