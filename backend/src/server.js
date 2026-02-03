import express from "express";
import cors from "cors";
import db from "./config/db.js";
import registerRoute from "./routes/register.route.js";

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/register", registerRoute);

app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
    });
});

// server
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
