import { pool } from "../config/db.js";

export async function getAllJournalEntries() {
    const result = await pool.query(
        "SELECT * FROM journal_entries ORDER BY created_at DESC"
    )

    return result.rows;

}