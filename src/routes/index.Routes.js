import { Router } from "express";
import userRoutes from "./user.Routes.js";
import authRoutes from "./auth.Routes.js";
import companiesRoutes from "./company.Routes.js";
import itemsRoutes from "./item.Routes.js";
import authMiddleware from "../auth/jwt.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", authMiddleware, userRoutes);
router.use("/company", authMiddleware, companiesRoutes);
router.use("/item", authMiddleware, itemsRoutes);

export default router;
