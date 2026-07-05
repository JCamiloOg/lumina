import authRoutes from "./auth.routes.js";
import usersRoutes from "./users.routes.js";
import productsRoutes from "./products.routes.js";
import ordersRoutes from "./orders.routes.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);

export default router;