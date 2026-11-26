import { pool } from "../config/db.js";

export async function getAllJournalEntries(userId: string) {
    const result = await pool.query(
        "SELECT * FROM journal_entries WHERE user_id = $1 ORDER BY created_at DESC",
        [userId]
    )

    return result.rows;

}

export async function createJournalEntry(userId: string, title: string, content: string) {
     const result = await pool.query(
        "INSERT INTO journal_entries (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
        [userId, title, content]
    )

    return result.rows[0];

}
export async function updateJournalEntry(id: string, userId: string, title: string, content: string) {
     const result = await pool.query(
        "UPDATE journal_entries SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *",
        [title, content, id, userId]
     )
     return result.rows[0];

}
export async function deleteJournalEntry(id: string, userId: string){
    const result = await pool.query(
        "DELETE FROM journal_entries WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
    )
    return result.rows[0];
}
