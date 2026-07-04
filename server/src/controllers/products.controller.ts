import { RequestHandler } from "express";
import { Product } from "../../generated/prisma/client";
import prisma from "../config/db";


export const getProducts: RequestHandler<
    { id?: string },
    { message: string, products?: Product[], product?: Product, pagination?: { page: number, limit: number, totalPages: number } },
    unknown,
    { page?: string, limit?: string, search?: string, status: boolean }
> = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const product = await prisma.product.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if (!product) return res.status(404).json({ message: "Producto no encontrado." });

            return res.status(200).json({ message: "Producto obtenido exitosamente.", product });
        }

        const { page = "1", limit = "5", search, status } = req.query;

        let pageNumber = Number(page);
        let limitNumber = Number(limit);

        if (isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;
        if (isNaN(limitNumber) || limitNumber < 1) limitNumber = 1;

        const skip = (pageNumber - 1) * limitNumber;

        const products = await prisma.product.findMany({
            skip,
            take: limitNumber,
            where: {
                status: status ? Boolean(status) : undefined,
                OR: search ? [
                    { name: { contains: search } },
                    { description: { contains: search } },
                ] : undefined,
            },
        });

        const totalProducts = await prisma.product.count({
            where: {
                OR: search ? [
                    { name: { contains: search } },
                    { description: { contains: search } },
                ] : undefined,
            },
        });

        const totalPages = Math.ceil(totalProducts / limitNumber);

        if (!products) return res.status(404).json({ message: "No se encontraron productos." });

        return res.status(200).json({ message: "Productos obtenidos exitosamente.", products, pagination: { page: pageNumber, limit: limitNumber, totalPages } });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener productos." });
    }
};

export const createProduct: RequestHandler<
    unknown,
    { message: string, product?: Product },
    Omit<Product, "status" | "id" | "createdAt">
> = async (req, res) => {
    try {
        const { name, image_url, price, description } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                image_url,
                price,
                description,
            }
        });

        return res.status(200).json({ message: "Producto creado exitosamente.", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear producto." });
    }
};


export const updateProduct: RequestHandler<
    { id?: string },
    { message: string, product?: Product },
    Omit<Product, "id" | "createdAt">
> = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image_url, price, description, status } = req.body;

        if (isNaN(Number(id))) return res.status(400).json({ message: "Producto no encontrado." });

        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                image_url,
                price,
                description,
                status
            }
        });

        return res.status(200).json({ message: "Producto actualizado exitosamente.", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar producto." });
    }
};


export const deleteProduct: RequestHandler<
    { id?: string },
    { message: string, product?: Product }
> = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) return res.status(400).json({ message: "Producto no encontrado." });


        const order = await prisma.orderDetail.findFirst({
            where: {
                product_id: Number(id)
            }
        });

        if (order) return res.status(400).json({ message: "No se puede eliminar el producto porque tiene pedidos asociados." });

        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({ message: "Producto eliminado exitosamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar producto." });
    }
};