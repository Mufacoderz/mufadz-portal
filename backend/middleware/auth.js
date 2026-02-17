import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secret123"
        );

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
