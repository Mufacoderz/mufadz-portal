import express from "express";
import cors from "cors";
import db from "./config/db.js";
import registerRoute from "./routes/register.route.js";

const app = express();
const PORT = 5050;

// middleware
app.use(cors());
app.use(express.json());

// health check (WAJIB ADA)
app.get("/", (req, res) => {
  res.send("SERVER OK");
});

// test DB (pakai async karena mysql2/promise)
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// routes
app.use("/api/register", registerRoute);

app.post("/ping", (req, res) => {
  console.log("PING MASUK");
  res.json({ message: "pong" });
});

// server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
