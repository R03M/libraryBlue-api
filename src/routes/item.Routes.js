import { Router } from "express";
import {
  createItem,
  createManyItems,
  deleteItem,
  getItemByCompany,
  updateItem,
} from "../controllers/item.js";

const router = Router();

router.post("/", getItemByCompany);
router.post("/new", createItem);
router.put("/update", updateItem);
router.delete("/delete", deleteItem);
router.post("/createManyI", createManyItems);

export default router;
