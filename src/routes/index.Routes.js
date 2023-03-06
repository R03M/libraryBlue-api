import { Router } from "express";
import userRoutes from "./user.Routes.js";
import registerRoutes from "./register.Routes.js";
// import itemRoutes from "./itemRoutes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/register", registerRoutes);
// router.use("/item", itemRoutes);

export default router;
