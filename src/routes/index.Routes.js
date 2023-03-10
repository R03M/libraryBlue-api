import { Router } from "express";
import userRoutes from "./user.Routes.js";
import registerRoutes from "./register.Routes.js";
import companiesRoutes from "./company.Routes.js"
import itemsRoutes from "./item.Routes.js"
import loginRoutes from "./login.Routes.js"

const router = Router();

router.use("/user", userRoutes);
router.use("/register", registerRoutes);
router.use("/company", companiesRoutes);
router.use("/item", itemsRoutes);
router.use("/login", loginRoutes);


export default router;
