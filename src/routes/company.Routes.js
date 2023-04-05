import { Router } from "express";
import {
  getCompanies,
  registerCompany,
  deleteCompany,
  updateCompany,
  selectCompany,
  allCompanyUsers,
  rmUserOfCompany
} from "../controllers/company.js";

const router = Router();

router.post("/all", getCompanies);
router.post("/new", registerCompany);
router.put("/update", updateCompany);
router.delete("/rmUserOfCompany", rmUserOfCompany);
router.delete("/delete", deleteCompany);
router.post("/selectCompany", selectCompany);
router.post("/allCompanyUsers", allCompanyUsers);

export default router;
