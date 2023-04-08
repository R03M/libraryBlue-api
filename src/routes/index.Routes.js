import { Router } from "express";
import userRoutes from "./user.Routes.js";
import registerRoutes from "./register.Routes.js";
import companiesRoutes from "./company.Routes.js";
import itemsRoutes from "./item.Routes.js";
import loginRoutes from "./login.Routes.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = Router();

router.use("/login", loginRoutes);
router.use("/register", registerRoutes);
router.use("/user", authMiddleware, userRoutes);
router.use("/company", authMiddleware, companiesRoutes);
router.use("/item", authMiddleware, itemsRoutes);

export default router;
