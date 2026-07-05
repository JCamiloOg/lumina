import { Router } from "express";
import { AuthRoles, AuthenticatedMiddleware } from "../middlewares/auth.middleware.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controller.js";
import { validteSchema } from "../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../validators/products.validator.js";


const router = Router();

/**
 * @openapi
 * paths:
 *   /products:
 *     get:
 *       tags:
 *       - Productos    
 *       summary: Obtiene todos los productos
 *       responses:
 *         '200':
 *           description: Productos obtenidos exitosamente
 */
router.get("/", getProducts);

/**
 * @openapi
 * paths:
 *   /products/{id}:
 *     get:
 *       tags:
 *       - Productos    
 *       summary: Obtiene un producto por ID
 *       responses:
 *         '200':
 *           description: Producto obtenido exitosamente
 */
router.get("/:id", getProducts);

/**
 * @openapi
 * paths:
 *   /products:
 *     post:
 *       tags:
 *       - Productos    
 *       summary: Crea un nuevo producto
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 image_url:
 *                   type: string
 *               required:
 *                 - name
 *                 - description
 *                 - price
 *                 - image_url
 *       responses:
 *         '201':
 *           description: Producto creado exitosamente
 */
router.post("/", AuthenticatedMiddleware, AuthRoles("administrador"), validteSchema(createProductSchema), createProduct);

/**
 * @openapi
 * paths:
 *   /products/{id}:
 *     put:
 *       tags:
 *       - Productos    
 *       summary: Actualiza un producto por ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 image_url:
 *                   type: string
 *                 status:
 *                   type: boolean
 *               required:
 *                 - name
 *                 - description
 *                 - price
 *                 - image_url
 *                 - status
 *       responses:
 *         '200':
 *           description: Producto actualizado exitosamente
 */
router.put("/:id", AuthenticatedMiddleware, AuthRoles("administrador"), validteSchema(updateProductSchema), updateProduct);

/**
 * @openapi
 * paths:
 *   /products/{id}:
 *     delete:
 *       tags:
 *       - Productos    
 *       summary: Elimina un producto por ID
 *       responses:
 *         '200':
 *           description: Producto eliminado exitosamente
 */
router.delete("/:id", AuthenticatedMiddleware, AuthRoles("administrador"), deleteProduct);

export default router;