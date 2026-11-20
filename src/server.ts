
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/hello", (req, res) => {
    res.json({
        message: "JournalAI API is running!"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
