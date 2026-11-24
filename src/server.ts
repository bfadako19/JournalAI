import express from "express";
import { pool } from "./config/db.js";
import journalRoutes from "./routes/journalRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/journal", journalRoutes);
app.use("/auth", authRoutes);

app.get("/hello", (req, res) => {
    res.json({
        message: "JournalAI API is running!"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
