import express from "express";
const router = express.Router();

import {createLead, updateLead, deleteLead, allLeads, getLeadById} from "../controllers/leadController.js";
// import authenticateJWT from "../middleware/authMiddleware.js";

router.post("/add", createLead);
router.put("/update/:id", updateLead);
router.delete("/delete/:id", deleteLead);
// router.get("/all", authenticateJWT ,allLeads);
router.get("/all", allLeads);
router.get("/getById/:id", getLeadById);

export default router;