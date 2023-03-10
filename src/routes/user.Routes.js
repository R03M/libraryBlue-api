import { Router } from "express";
import {
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const router = Router();

router.get("/all", getAllUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
