import express from "express";
import { getJournalEntries, createJournal, updateJournal, deleteJournal } from "../controllers/journalController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getJournalEntries);
router.post("/", authenticateToken, createJournal);
router.put("/:id", authenticateToken, updateJournal);
router.delete("/:id", authenticateToken, deleteJournal);

export default router;