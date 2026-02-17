import express from "express";
import { getProfile } from "../controllers/profile.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

export default router;
