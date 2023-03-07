import { Router } from "express";
import userRoutes from "./user.Routes.js";
import registerRoutes from "./register.Routes.js";
import companiesRoutes from "./company.Routes.js"

const router = Router();

router.use("/users", userRoutes);
router.use("/register", registerRoutes);
router.use("/companies", companiesRoutes);


export default router;
