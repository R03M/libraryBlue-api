import { Router } from "express";
import { getCompanies, registerCompany, deleteCompany, updateCompany } from "../controllers/company.js";

const router = Router();

router.get("/all", getCompanies);
router.post("/new", registerCompany);
router.delete("/delete", deleteCompany);
router.post("/update", updateCompany);

export default router;
