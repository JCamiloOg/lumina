import { RequestHandler } from "express";
import prisma from "../config/db.js";

export const getDashboardSummary: RequestHandler<
    unknown,
    {
        message: string;
        totalUsers?: number;
        totalProducts?: number;
        totalOrders?: number;
        ordersByStatus?: { status: string; count: number }[];
    }
> = async (_req, res) => {
    try {
        const [totalUsers, totalProducts, totalOrders, ordersByStatus] = await Promise.all([
            prisma.user.count(),
            prisma.product.count(),
            prisma.order.count(),
            prisma.order.groupBy({
                by: ["status"],
                _count: { status: true },
            }),
        ]);

        return res.status(200).json({
            message: "Resumen obtenido exitosamente.",
            totalUsers,
            totalProducts,
            totalOrders,
            ordersByStatus: ordersByStatus.map((entry) => ({
                status: entry.status,
                count: entry._count.status,
            })),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el resumen del panel." });
    }
};
