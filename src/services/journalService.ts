import { pool } from "../config/db.js";

export async function getAllJournalEntries(userId: string) {
    const result = await pool.query(
        "SELECT * FROM journal_entries WHERE user_id = $1 ORDER BY created_at DESC",
        [userId]
    )

    return result.rows;

}