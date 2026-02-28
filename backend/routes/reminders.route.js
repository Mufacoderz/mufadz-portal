import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ─── SQL untuk buat tabel (jalankan sekali di phpMyAdmin) ─────────────────────
/*
CREATE TABLE IF NOT EXISTS reminders (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  title       VARCHAR(255) NOT NULL,
  note        TEXT,
  time        DATETIME,
  is_done     TINYINT(1) DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/

// GET /api/reminders
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM reminders WHERE user_id = ? ORDER BY is_done ASC, created_at DESC",
            [req.user.id]
        );
        res.json({ data: rows });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// POST /api/reminders
router.post("/", async (req, res) => {
    const { title, note, time } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: "Judul wajib diisi" });

    try {
        const [result] = await db.query(
            "INSERT INTO reminders (user_id, title, note, time) VALUES (?, ?, ?, ?)",
            [req.user.id, title.trim(), note || null, time || null]
        );
        const [rows] = await db.query("SELECT * FROM reminders WHERE id = ?", [result.insertId]);
        res.status(201).json({ message: "Reminder ditambahkan", data: rows[0] });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// PATCH /api/reminders/:id/toggle
router.patch("/:id/toggle", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM reminders WHERE id = ? AND user_id = ?",
            [req.params.id, req.user.id]
        );
        if (!rows.length) return res.status(404).json({ message: "Reminder tidak ditemukan" });

        await db.query(
            "UPDATE reminders SET is_done = NOT is_done WHERE id = ?",
            [req.params.id]
        );
        res.json({ message: "Status diupdate" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// DELETE /api/reminders/:id
router.delete("/:id", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT id FROM reminders WHERE id = ? AND user_id = ?",
            [req.params.id, req.user.id]
        );
        if (!rows.length) return res.status(404).json({ message: "Reminder tidak ditemukan" });

        await db.query("DELETE FROM reminders WHERE id = ?", [req.params.id]);
        res.json({ message: "Reminder dihapus" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;