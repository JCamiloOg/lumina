import { Router } from "express";
import { AuthRoles, AuthenticatedMiddleware } from "../middlewares/auth.middleware";
import { getUsers } from "../controllers/users.controller";

const router = Router();

/**
 * @openapi
 * paths:
 *   /users:
 *     get:
 *       tags:
 *       - Usuarios
 *       summary: Obtiene todos los usuarios
 *       responses:
 *         '200':
 *           description: Lista de usuarios obtenida exitosamente
 */
router.get("/", AuthenticatedMiddleware, AuthRoles("administrador"), getUsers);
/**
 * @openapi
 * paths:
 *   /users/{id}:
 *     get:
 *       tags:
 *       - Usuarios
 *       summary: Obtiene un usuario por ID
 *       responses:
 *         '200':
 *           description: Usuario obtenido exitosamente
 */
router.get("/:id", AuthenticatedMiddleware, AuthRoles("administrador"), getUsers);

export default router;
