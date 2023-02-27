import { Router } from "express";
import userRoutes from "./routesUser.js";
// import itemRoutes from "./routesItem";

const router = Router();

router.use("/users", userRoutes);
// router.use("/item", itemRoutes);

export default router;
