import { Router } from "express";
import { createItem, getItemByCompany } from "../controllers/item.js";

const router = Router();

router.post("/", getItemByCompany);
router.post("/new", createItem);

export default router;
