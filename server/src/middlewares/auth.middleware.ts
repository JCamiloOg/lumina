import { SECRET_KEY } from "../config/env";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserJwtPayload } from "../@types/jwt";
import { RequestHandler } from "express";
import prisma from "../config/db";
import { Role } from "../../generated/prisma/enums";



export const AuthenticatedMiddleware: RequestHandler = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ message: "No autorizado." });

        const decodedToken = jwt.verify(token, SECRET_KEY) as UserJwtPayload;

        if (!decodedToken) return res.status(401).json({ message: "No autorizado." });

        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.userId
            },
            omit: {
                password: true,
                createdAt: true
            }
        });

        const rolesQuery = await prisma.user.findMany({
            distinct: ["role"],
            select: {
                role: true
            }
        });

        const roles = rolesQuery.map(r => r.role);

        if (!user) return res.status(404).json({ message: "No autorizado." });

        if (!roles.includes(user.role)) return res.status(403).json({ message: "No autorizado." });

        req.authUser = user;

        const originalJson = res.json;

        res.json = function (data) {
            const extra = {
                authUser: user
            };

            const newData = { ...data, ...extra };

            return originalJson.call(this, newData);
        };

        next();

    } catch (error) {
        if (error instanceof JsonWebTokenError) {

            if (error.name === "JsonWebTokenError") return res.status(401).json({ message: "Autenticación inválida, inicie sesión de nuevo." });

            if (error.name === "TokenExpiredError") return res.status(401).json({ message: "Su sesión expiró, inicie sesión de nuevo." });
        }

        return res.status(401).json({ message: "Error al verificar su sesión." });
    }
};


export const AuthRoles = (...allowedRoles: Role[]): RequestHandler => {
    return (req, res, next) => {

        if (!req.authUser) return res.status(401).json({ message: "No autorizado." });

        console.log(req.authUser);

        const isAllowed = allowedRoles.includes(req.authUser.role);

        if (!isAllowed) return res.status(403).json({ message: "No autorizado." });

        next();
    };
};

