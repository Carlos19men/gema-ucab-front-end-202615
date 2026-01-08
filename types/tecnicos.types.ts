export type Tecnico = {
  idTecnico: number;
  idGT?: number;
  nombre?: string;
  correo?: string; // Opcional por si no viene de la API
  area?: string;
};

// Tipo para compatibilidad con el código existente
export type TecnicoLegacy = {
  id: number;
  nombre: string;
  correo: string;
};
