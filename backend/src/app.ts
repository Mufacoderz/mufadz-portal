import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
