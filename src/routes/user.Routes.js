import { Router } from "express";
import { getAllUser, updateUser, deleteUser, validateData, updatePositionUser } from "../controllers/users.js";

const router = Router();

router.get("/all", getAllUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
router.post("/validate", validateData);
router.put("/changePosition", updatePositionUser);

export default router;
