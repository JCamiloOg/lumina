import { Router } from "express";
import { AuthRoles, AuthenticatedMiddleware } from "../middlewares/auth.middleware";
import { createOrder, getAllOrders, getDetailOrder, getOrderByUser, updateStatusOrder } from "../controllers/orders.controller";


const router = Router();

/**
 * @openapi
 * paths:
 *   /orders:
 *     post:
 *       tags: 
 *       - Pedidos
 *       summary: Crea un nuevo pedido
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       name:
 *                         type: string
 *               required:
 *                 - products
 *       responses:
 *         '201':
 *           description: Pedido creado exitosamente
 */
router.post("/", AuthenticatedMiddleware, createOrder);

/**
 * @openapi
 * paths:
 *   /orders/user:
 *     get:
 *       tags: 
 *       - Pedidos
 *       summary: Obtiene los pedidos del usuario
 *       responses:
 *         '200':
 *           description: Pedidos obtenidos exitosamente
 */
router.get("/user", AuthenticatedMiddleware, getOrderByUser);

/**
 * @openapi
 * paths:
 *   /orders:
 *     get:
 *       tags: 
 *       - Pedidos
 *       summary: Obtiene todos los pedidos
 *       responses:
 *         '200':
 *           description: Pedidos obtenidos exitosamente
 */
router.get("/", AuthenticatedMiddleware, AuthRoles("administrador"), getAllOrders);

/**
 * @openapi
 * paths:
 *   /orders/{id}:
 *     get:
 *       tags: 
 *       - Pedidos
 *       summary: Obtiene un pedido por ID
 *       responses:
 *         '200':
 *           description: Pedido obtenido exitosamente
 */
router.get("/:id", AuthenticatedMiddleware, getDetailOrder);

/**
 * @openapi
 * paths:
 *   /orders/{id}/status:
 *     put:
 *       tags: 
 *       - Pedidos
 *       summary: Actualiza el estado de un pedido
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *               required:
 *                 - status
 *       responses:
 *         '200':
 *           description: Estado del pedido actualizado exitosamente
 */
router.put("/:id/status", AuthenticatedMiddleware, AuthRoles("administrador"), updateStatusOrder);

export default router;
