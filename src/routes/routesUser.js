import { Router } from "express";
import { getUser, postUsers } from "../controllers/users.js";

const router = Router();

router.get("/", getUser);
router.post("/", postUsers);

export default router;
