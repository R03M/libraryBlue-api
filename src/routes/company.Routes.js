import { Router } from "express";
import { getCompanies, registerCompany } from '../controllers/company.js'

const router = Router();

router.get("/all", getCompanies);
router.post('/new', registerCompany)

export default router;
