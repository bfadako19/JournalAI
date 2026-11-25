import express from "express";
import { getJournalEntries, createJournal, updateJournal } from "../controllers/journalController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getJournalEntries);
router.post("/", authenticateToken, createJournal);
router.put("/:id", authenticateToken, updateJournal);

export default router;