import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItemByCompany,
  updateItem,
} from "../controllers/item.js";

const router = Router();

router.post("/", getItemByCompany);
router.post("/new", createItem);
router.post("/update", updateItem);
router.delete("/delete", deleteItem);

export default router;
