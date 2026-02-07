import express from "express";
import cors from "cors";
import registerRoute from "./routes/register.route.js";

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SERVER OK");
});

app.use("/api/register", registerRoute);

app.listen(PORT, () => {
    console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});
