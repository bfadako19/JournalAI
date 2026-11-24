import express from "express";
import { getJournalEntries } from "../controllers/journalController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getJournalEntries);

export default router;