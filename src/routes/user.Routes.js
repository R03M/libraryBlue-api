import { Router } from "express";
import { getAllUser, updateUser, deleteUser, validateData } from "../controllers/users.js";

const router = Router();

router.get("/all", getAllUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
router.post("/validate", validateData);

export default router;
