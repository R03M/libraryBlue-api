import { Router } from "express";
import { getCompanies, registerCompany, deleteCompany } from "../controllers/company.js";

const router = Router();

router.get("/all", getCompanies);
router.post("/new", registerCompany);
router.delete("/delete", deleteCompany);

export default router;
