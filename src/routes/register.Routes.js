import { Router } from "express";
import {
  registerUser,
  checkEmail,
} from "../controllers/register.js";

const router = Router();

router.post("/new", registerUser);
router.post("/email", checkEmail);

export default router;
