import { Router } from "express";
import { getUser, registerUser } from "../controllers/users.js";

const router = Router();

router.get("/", getUser);
router.post("/register", registerUser);

export default router;
