export type Usuario = {
  Id: number;
  Nombre: string;
  Correo: string;
  Tipo: "DIRECTOR" | "SUPERVISOR" ;
  Contraseña: string | undefined;
};
