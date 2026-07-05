
import z from "zod";
import { Decimal } from "@prisma/client/runtime/client";
import { Product } from "@prisma/client";

export const createProductSchema: z.ZodType<{ body: Omit<Product, "id" | "status" | "createdAt">, params?: unknown, query?: unknown }> = z.object({
    body: z.object({
        name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").trim(),
        image_url: z.url("La URL de la imagen es inválida").trim(),
        price: z.union([z.number(), z.string()]).transform((val) => new Decimal(val)),
        description: z.string().min(5, "La descripción debe tener al menos 5 caracteres").trim(),
    })
});

export const updateProductSchema: z.ZodType<{ body: Omit<Product, "id" | "createdAt">, params?: unknown, query?: unknown }> = z.object({
    body: z.object({
        name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").trim(),
        image_url: z.url("La URL de la imagen es inválida").trim(),
        price: z.union([z.number(), z.string()]).transform((val) => new Decimal(val)),
        description: z.string().min(5, "La descripción debe tener al menos 5 caracteres").trim(),
        status: z.boolean(),
    }),
    params: z.object({
        id: z.string().transform((val) => Number(val)).refine((val) => !isNaN(val), "El ID debe ser un número"),
    }),
});


