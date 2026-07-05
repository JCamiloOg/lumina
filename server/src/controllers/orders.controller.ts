import { RequestHandler } from "express";
import prisma from "../config/db.js";
import { Decimal } from "@prisma/client/runtime/client.js";
import { Order, OrderDetail, StatusOrder, User } from "@prisma/client";


export const createOrder: RequestHandler<
    unknown,
    { message: string, order?: Order },
    { cart: { idProduct: number, quantity: number, name: string }[] }
> = async (req, res) => {
    try {
        const { cart } = req.body;

        if (!req.authUser?.id) return res.status(400).json({ message: "No se ha iniciado sesión." });

        if (!cart || !Array.isArray(cart) || cart.length === 0) return res.status(400).json({ message: "Carrito está vacío." });

        let totalOrder: Decimal = new Decimal(0.0);

        const order_details: Omit<OrderDetail, "id" | "order_id" | "createdAt">[] = [];

        for (const product of cart) {
            const { idProduct, quantity, name } = product;

            if (!idProduct) return res.status(400).json({ message: `El producto ${name} no existe.` });

            if (!quantity || typeof quantity !== "number" || quantity <= 0) return res.status(400).json({ message: `La cantidad del producto llamado "${name}" no es valida.` });

            const productQuery = await prisma.product.findUnique({
                where: {
                    id: idProduct
                },
                select: {
                    name: true,
                    price: true,
                }
            });

            if (!productQuery) return res.status(400).json({ message: `El producto ${name} no existe. verifica que no haya sido eliminado.` });

            totalOrder = totalOrder.plus(productQuery.price.mul(quantity));
            const subTotal = productQuery.price.mul(quantity);

            order_details.push({
                product_id: idProduct,
                quantity,
                unit_price: productQuery.price,
                subtotal: subTotal,
            });
        }


        const order = await prisma.order.create({
            data: {
                user_id: req.authUser.id,
                total: totalOrder,
            }
        });

        await prisma.orderDetail.createMany({
            data: order_details.map(detail => ({
                order_id: order.id,
                ...detail
            }))
        });



        return res.status(201).json({
            message: "Pedido creado exitosamente.",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear pedido." });
    }
};


export const getOrderByUser: RequestHandler<
    unknown,
    { message: string, orders?: Order[], pagination?: { page: number, limit: number, totalPages: number } },
    unknown,
    { page?: string, limit?: string, search?: string }
> = async (req, res) => {
    try {
        if (!req.authUser?.id) return res.status(400).json({ message: "No se ha iniciado sesión." });

        const { page = 1, limit = 5, search } = req.query;
        let pageNumber = Number(page);
        let limitNumber = Number(limit);

        if (isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;
        if (isNaN(limitNumber) || limitNumber < 1) limitNumber = 5;

        const skip = (pageNumber - 1) * limitNumber;

        const orders = await prisma.order.findMany({
            where: {
                user_id: req.authUser.id,
                OR: search ? [
                    {
                        id: { contains: search }
                    },
                ] : undefined,
            },
            skip,
            take: limitNumber,
        });

        const totalOrders = await prisma.order.count({
            where: {
                user_id: req.authUser.id,
                OR: search ? [
                    {
                        id: { contains: search }
                    },
                ] : undefined,
            },
        });

        const totalPages = Math.ceil(totalOrders / limitNumber);

        return res.status(200).json({
            message: "Pedidos obtenidos exitosamente.",
            orders,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                totalPages
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener pedido." });
    }
};


export const getAllOrders: RequestHandler<
    unknown,
    { message: string, orders?: (Order & { user: Pick<User, "name"> | null })[], pagination?: { page: number, limit: number, totalPages: number } },
    unknown,
    { page?: string, limit?: string, search?: string }
> = async (req, res) => {

    try {
        const { page = 1, limit = 5, search } = req.query;

        let pageNumber = Number(page);
        let limitNumber = Number(limit);

        if (isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;
        if (isNaN(limitNumber) || limitNumber < 1) limitNumber = 5;

        const skip = (pageNumber - 1) * limitNumber;

        const orders = await prisma.order.findMany({
            skip,
            take: limitNumber,
            where: {
                OR: search ? [
                    {
                        id: { contains: search }
                    },
                    {
                        user_id: { contains: search }
                    }, {
                        user: {
                            name: { contains: search }
                        }
                    }
                    ,
                ] : undefined,
            },
            select: {
                id: true,
                user_id: true,
                status: true,
                total: true,
                createdAt: true,
                user: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        console.log(orders);

        const totalOrders = await prisma.order.count({
            where: {
                OR: search ? [
                    { user_id: { contains: search } },
                ] : undefined,
            },
        });

        const totalPages = Math.ceil(totalOrders / limitNumber);

        return res.status(200).json({
            message: "Pedidos obtenidos exitosamente.",
            orders,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                totalPages
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener pedido." });
    }
};

export const getDetailOrder: RequestHandler<
    { id: string },
    { message: string, orderDetails?: Omit<OrderDetail, "id" | "createdAt">[] }
> = async (req, res) => {
    try {
        const { id } = req.params;

        const orderDetails = await prisma.orderDetail.findMany({
            where: {
                order_id: id
            },
            select: {
                order_id: true,
                product_id: true,
                quantity: true,
                unit_price: true,
                subtotal: true,
                product: {
                    select: {
                        name: true,
                        image_url: true
                    }
                }
            }
        });

        return res.status(200).json({
            message: "Detalle del pedido obtenido exitosamente.",
            orderDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener detalle del pedido." });
    }
};


export const updateStatusOrder: RequestHandler<
    { id?: string },
    { message: string },
    { status: StatusOrder }
> = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id) return res.status(400).json({ message: "ID del pedido no proporcionado." });
        if (!status) return res.status(400).json({ message: "Estado del pedido no proporcionado." });


        const order = await prisma.order.findMany({
            select: {
                id: true
            },
            where: {
                id
            }
        });

        if (!order) return res.status(400).json({ message: "El pedido no existe." });

        await prisma.order.update({
            where: {
                id
            },
            data: {
                status
            }
        });

        return res.status(200).json({
            message: "Estado del pedido actualizado exitosamente.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el estado del pedido." });
    }
};

