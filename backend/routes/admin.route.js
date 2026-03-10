import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Cek token dulu, lalu cek role admin
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Akses ditolak: bukan admin" });
    }
    next();
};

router.use(authMiddleware, requireAdmin);

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;