import { Router } from "express";
import {
  getAllUser,
  getDataUserId,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const router = Router();

router.get("/all", getAllUser);
router.post("/dataUser", getDataUserId);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
