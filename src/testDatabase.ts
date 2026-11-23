import { getAllJournalEntries } from "./services/journalService.js";

async function testJournalService() {
    try {
        const entries = await getAllJournalEntries();

        console.log("Journal entries retrieved successfully:");
        console.log(entries);
    } catch (error) {
        console.error("Failed to retrieve journal entries:", error);
    }
}

testJournalService();