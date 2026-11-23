import { Request, Response } from "express";
import { getAllJournalEntries } from "../services/journalService.js";

export async function getJournalEntries(req: Request, res: Response) {
    try {
        const entries = await getAllJournalEntries();

        res.status(200).json({
            message: "Journal entries retrieved successfully",
            entries: entries
        });
    } catch (error) {
        console.error("Error retrieving journal entries:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}