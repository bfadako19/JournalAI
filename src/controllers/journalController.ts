import { Request, Response } from "express";
import { getAllJournalEntries, createJournalEntry, updateJournalEntry } from "../services/journalService.js";

export async function getJournalEntries(req: Request, res: Response) {
    try {
        const entries = await getAllJournalEntries(req.user!.userId);

        res.status(200).json({
            message: "Journal entries retrieved successfully",
            entries
        });
    } catch (error) {
        console.error("Error retrieving journal entries:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function createJournal(req: Request, res: Response) {
    try {
        const { title, content } = req.body;
        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() ||
            !content.trim()
        ) {
            res.status(400).json({
                message: "Title and content are required."
            });
            return;
        }

        const createdEntry = await createJournalEntry(req.user!.userId, title.trim(), content.trim());

        res.status(201).json({
            message: "Journal entry created successfully",
            createdEntry
        });
    } catch (error) {
        console.error("Error creating journal entry:", error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
}
export async function updateJournal(req: Request<{ id: string }>, res: Response) {
    try {
        const id = req.params.id;
        const { title, content } = req.body;

        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() ||
            !content.trim()
        ) {
            res.status(400).json({
                message: "Title and content are required."
            });
            return;
        }
        const updatedEntry = await updateJournalEntry(id, req.user!.userId, title.trim(), content.trim());

        if (!updatedEntry) {
            res.status(404).json({
                message: "Journal entry not found."
            });
            return;
        }

     res.status(200).json({
            message: "Journal entry updated successfully",
            updatedEntry
        });
    } catch (error) {
        console.error("Error updating journal entry:", error);

        res.status(500).json({
            message: "Internal server error"
        });
}
}
