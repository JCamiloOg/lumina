import z from "zod";
import { User } from "../../generated/prisma/client";

type LoginInput = Pick<User, "email" | "password">;

type RegisterInput = Omit<User, "id" | "role" | "createdAt">;

export const loginSchema: z.ZodType<{ body: LoginInput, params?: unknown, query?: unknown }> = z.object({
    body: z.object({
        email: z.email("Correo electrónico inválido").trim(),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
});

export const registerSchema: z.ZodType<{ body: RegisterInput, params?: unknown, query?: unknown }> = z.object({
    body: z.object({
        name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").trim(),
        email: z.email("Correo electrónico inválido").trim(),
        phone: z.string().length(9, "El teléfono debe tener 9 dígitos"),
        address: z.string().min(5, "La dirección debe tener al menos 5 caracteres").trim(),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
});



