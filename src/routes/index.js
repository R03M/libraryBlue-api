import { Router } from "express";
import userRoutes from "./userRoutes.js";
// import itemRoutes from "./itemRoutes.js";

const router = Router();

router.use("/users", userRoutes);
// router.use("/item", itemRoutes);

export default router;
