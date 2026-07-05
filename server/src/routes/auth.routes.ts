import { Router } from "express";
import { AuthRoles, AuthenticatedMiddleware } from "../middlewares/auth.middleware.js";
import { login, register, verifyToken } from "../controllers/users.controller.js";
import { validteSchema } from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validators/auth.validator.js";


const router = Router();

/**
 * @openapi
 * paths:
 *   /auth/login:
 *     post:
 *       tags:
 *       - Autenticación
 *       summary: Inicia sesión como usuario
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         '200':
 *           description: Sesión iniciada exitosamente
 */
router.post("/login", validteSchema(loginSchema), login);
/**
 * @openapi
 * paths:
 *   /auth/register:
 *     post:
 *       tags:
 *       - Autenticación
 *       summary: Registra un nuevo usuario
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *                 password:
 *                   type: string
 *               required:
 *                 - name
 *                 - email
 *                 - phone
 *                 - address
 *                 - password
 *       responses:
 *         '201':
 *           description: Usuario registrado exitosamente
 */
router.post("/register", register);

/**
 * @openapi
 * paths:
 *   /auth/verify-token:
 *     tags:
 *     - Autenticación
 *     get:
 *       summary: Verifica que el token sea válido
 *       responses:
 *         '200':
 *           description: Token válido
 */
router.get("/verify-token", verifyToken);

/**
 * @openapi
 * paths:
 *   /auth/register-admin:
 *     post:
 *       tags:
 *       - Usuarios
 *       summary: Registra un nuevo administrador
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: ["cliente", "administrador"]
 *                   default: "administrador"
 *               required:
 *                 - name
 *                 - email
 *                 - phone
 *                 - address
 *                 - password
 *       responses:
 *         '201':
 *           description: Administrador registrado exitosamente
 */
router.post("/register-admin", AuthenticatedMiddleware, AuthRoles("administrador"), register);


export default router;
