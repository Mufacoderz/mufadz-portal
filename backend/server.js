import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SERVER OK");
});

// 🔐 Semua auth dalam satu prefix
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});
