import { Router } from "express";
import { getUser } from "../controllers/users.js";

const router = Router();

router.get("/all", getUser);

export default router;
