import z from "zod";
import { StatusOrder } from "../../generated/prisma/enums";

type CartItem = { idProduct: number, quantity: number, name: string };

export const createOrderSchema: z.ZodType<{ body: { cart: CartItem[] }, params?: unknown, query?: unknown }> = z.object({
    body: z.object({
        cart: z.array(
            z.object({
                idProduct: z.number().min(1, "El ID del producto debe ser mayor a 0"),
                quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
                name: z.string().min(3, "El nombre del producto debe tener al menos 3 caracteres"),
            })
        )
    })
});


export const updateStatusOrderSchema: z.ZodType<{ body: { status: StatusOrder }, params?: unknown, query?: unknown }> = z.object({
    body: z.object({
        status: z.enum(StatusOrder, {
            error: "El estado de la orden no es válido",
        }),
    }),
});