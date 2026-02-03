import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    res.json({ message: "Register route OK" });
});

export default router;
