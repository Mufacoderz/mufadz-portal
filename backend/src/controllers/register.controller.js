import db from "../config/db.js";
import { hashPassword } from "../utils/hash.js";

const register = async (req, res) => {
    console.log("REGISTER HIT");
    try {
        const { nama, email, password } = req.body;

        if (!nama || !email || !password) {
            return res.status(400).json({ message: "Semua field wajib diisi" });
        }

        // cek email
        const [exist] = await db.query("SELECT id FROM users WHERE email = ?", [
            email,
        ]);

        if (exist.length > 0) {
            return res.status(409).json({ message: "Email sudah terdaftar" });
        }

        const hashedPassword = await hashPassword(password);

        // insert ke DB
        const [result] = await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [nama, email, hashedPassword],
        );

        res.status(201).json({
            message: "Register berhasil",
            user: {
                id: result.insertId,
                name: nama,
                email,
            },
        });
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

export { register };
