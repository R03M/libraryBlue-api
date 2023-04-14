import { Router } from "express";
import {
  getCompanies,
  registerCompany,
  deleteCompany,
  updateCompany,
  selectCompany,
  allCompanyUsers,
  rmUserOfCompany,
  disconnectCompanyAssociated
} from "../controllers/company.js";

const router = Router();

router.post("/all", getCompanies);
router.post("/new", registerCompany);
router.put("/update", updateCompany);
router.delete("/rmUserOfCompany", rmUserOfCompany);
router.delete("/deleteCompany", deleteCompany);
router.post("/selectCompany", selectCompany);
router.post("/allCompanyUsers", allCompanyUsers);
router.put("/disconnectCopAssoc", disconnectCompanyAssociated);

export default router;
