import { Router } from "express";
import { getCompanies, registerCompany, deleteCompany, updateCompany } from "../controllers/company.js";

const router = Router();

router.get("/all", getCompanies);
router.post("/new", registerCompany);
router.put("/update", updateCompany);
router.delete("/delete", deleteCompany);

export default router;
