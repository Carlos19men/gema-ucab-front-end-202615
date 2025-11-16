import type { Usuario } from "@/types/usuarios.types";

export type GrupoTrabajo = {
  id: number;
  codigo: string;
  nombre: string;
  supervisorId: number;
};

export type TrabajaEnGrupo = {
  grupoDeTrabajoId: number;
  usuarios: Usuario[];
};
