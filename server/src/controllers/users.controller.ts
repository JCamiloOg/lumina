import { RequestHandler } from "express";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.js";
import prisma from "../config/db.js";
import { User } from "@prisma/client";
import { UserJwtPayload } from "../@types/jwt.js";


export const login: RequestHandler<
    unknown,
    { message: string, token?: string, user?: Omit<User, "createdAt"> },
    Pick<User, "email" | "password">
> = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Debe completar todos los campos." });

        const user = await prisma.user.findUnique({
            omit: {
                createdAt: true
            },
            where: { email }
        });

        if (!user) return res.status(401).json({ message: "El correo no está registrado, regístrate para acceder." });

        const isMatchPassword = await compare(password, user.password);

        if (!isMatchPassword) return res.status(401).json({ message: "El correo o la contraseña es incorrecto." });

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, SECRET_KEY, { expiresIn: "24h" });

        return res.status(200).json({ message: "Inicio de sesión exitoso.", token, user });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al iniciar sesión." });
    }
};

export const register: RequestHandler<
    unknown,
    { message: string },
    Omit<User, "id" | "createdAt">
> = async (req, res) => {
    try {
        const { name, email, phone, address, password, role } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: "Debe completar todos los campos." });

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: { equals: email } },
                    { phone: { equals: phone } }
                ]
            }
        });

        if (user) return res.status(400).json({ message: "El correo o número de teléfono ya está registrado." });

        const hashedPassword = await hash(password, 10);

        const newUser = {
            phone,
            address,
            name,
            email,
            password: hashedPassword,
            role
        };

        const isCreateUser = await prisma.user.create({
            data: newUser
        });

        if (!isCreateUser) return res.status(500).json({ message: "Error al registrar usuario." });

        return res.status(201).json({ message: "Usuario registrado exitosamente." });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al registrar usuario." });
    }
};

export const verifyToken: RequestHandler<
    unknown,
    { message: string, user?: Partial<User> },
    unknown
> = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No se proporcionó el token." });

        const decodedToken = jwt.verify(token, SECRET_KEY) as UserJwtPayload;
        if (!decodedToken) return res.status(401).json({ message: "Token inválido." });

        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.userId
            },
            omit: {
                createdAt: true,
                password: true
            }
        });

        if (!user) return res.status(404).json({ message: "No se encontró el usuario." });

        return res.status(200).json({ message: "Token verificado exitosamente.", user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al verificar el token." });
    }
};

export const getUsers: RequestHandler<
    { id?: string },
    { message: string, users?: Partial<User>[], user?: Partial<User>, pagination?: { page: number, limit: number, totalPages: number } },
    unknown,
    { page?: string, limit?: string, search?: string }
> = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const user = await prisma.user.findUnique({
                where: {
                    id
                },
                omit: {
                    password: true,
                }
            });

            if (!user) return res.status(404).json({ message: "No se encontró el usuario." });

            return res.status(200).json({ message: "Usuario obtenido exitosamente.", user });
        }

        const { page = "1", limit = "5", search } = req.query;

        let pageNumber = Number(page);
        let limitNumber = Number(limit);

        if (isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;
        if (isNaN(limitNumber) || limitNumber < 1) limitNumber = 1;

        const skip = (pageNumber - 1) * limitNumber;

        const users = await prisma.user.findMany({
            skip,
            take: limitNumber,
            where: {
                OR: search ? [
                    { name: { contains: search } },
                    { email: { contains: search } },
                    { phone: { contains: search } },
                    { address: { contains: search } }
                ] : undefined,
            },
            omit: {
                password: true
            }
        });

        const totalUsers = await prisma.user.count({
            where: {
                OR: search ? [
                    { name: { contains: search } },
                    { email: { contains: search } },
                    { phone: { contains: search } },
                    { address: { contains: search } }
                ] : undefined,
            },
        });

        const totalPages = Math.ceil(totalUsers / limitNumber);

        if (!users) return res.status(404).json({ message: "No se encontraron usuarios." });

        return res.status(200).json({ message: "Usuarios obtenidos exitosamente.", users, pagination: { page: pageNumber, limit: limitNumber, totalPages } });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener usuarios." });
    }
};