import { Router } from "express";
import { AuthRoles, AuthenticatedMiddleware } from "../middlewares/auth.middleware.js";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";

const router = Router();

/**
 * @openapi
 * paths:
 *   /dashboard:
 *     get:
 *       tags:
 *       - Dashboard
 *       summary: Obtiene el resumen del panel de control (solo administrador)
 *       responses:
 *         '200':
 *           description: Resumen obtenido exitosamente
 *         '403':
 *           description: No autorizado
 */
router.get("/", AuthenticatedMiddleware, AuthRoles("administrador"), getDashboardSummary);

export default router;
