import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
    nama: string;
    email: string;
    password: string;
}

let users: User[] = [];

export const register = async (req: Request, res: Response) => {
    const { nama, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    users.push({ nama, email, password: hashed });

    res.json({ message: "Register success" });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    res.json({ message: "Login success", token });
};
