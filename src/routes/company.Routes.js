import { Router } from "express";
import { getCompanies, registerCompany, deleteCompany, updateCompany, selectCompany, allCompanyUsers } from "../controllers/company.js";

const router = Router();

router.get("/all", getCompanies);
router.post("/new", registerCompany);
router.put("/update", updateCompany);
router.delete("/delete", deleteCompany);
router.post("/selectCompany", selectCompany);
router.post("/allCompanyUsers", allCompanyUsers);

export default router;
