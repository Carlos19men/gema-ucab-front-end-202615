import { z } from "zod";

const usuarioSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    correo: z.string().email("Correo inválido"),
    tipo: z.enum(["SUPERVISOR", "COORDINADOR", "DIRECTOR"] as const, {
        required_error: "El tipo es requerido",
    }),
});

type T = z.infer<typeof usuarioSchema>;
const t: T = {
    nombre: "Test",
    correo: "test@test.com",
    tipo: "SUPERVISOR"
};
