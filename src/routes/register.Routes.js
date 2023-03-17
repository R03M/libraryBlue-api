import { Router } from "express";
import {
  registerUser,
  checkEmail,
  selectCompany,
} from "../controllers/register.js";

const router = Router();

router.post("/new", registerUser);
router.post("/checkEmail", checkEmail);
router.post("/selectCompany", selectCompany);

export default router;
