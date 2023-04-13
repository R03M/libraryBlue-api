import { Router } from "express";
import { checkEmail, registerUser, login, logOut } from "../controllers/auth.js";

const router = Router();

router.post("/checkEmail", checkEmail);
router.post("/signIn", registerUser);
router.post("/logIn", login);
router.post("/logOut", logOut);

export default router;
