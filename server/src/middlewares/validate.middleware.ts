import { RequestHandler } from "express";
import z from "zod";

export const validteSchema = (schema: z.ZodTypeAny): RequestHandler => {
    return async (req, res, next) => {
        try {
            const result = await schema.safeParseAsync({
                body: req.body,
                params: req.params,
                query: req.query
            });

            if (!result.success) {
                const error = result.error?.issues[0]?.message;
                return res.status(400).json({ message: error });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al validar" });
        }
    };
};