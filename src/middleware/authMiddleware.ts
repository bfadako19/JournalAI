import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
const authHeader = req.headers.authorization;

const token = authHeader && authHeader.split(" ")[1];

if (!token) {
    res.status(401).json({
        message: "Access denied. No token provided."
    });
    return;
}

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET is not configured");
}

try {
    const decoded = jwt.verify(token, secret);

if (typeof decoded === "string" || typeof decoded.userId !== "string") {
    res.status(401).json({
        message: "Invalid token payload."
    });
    return;
}

req.user = {
    userId: decoded.userId
};

next();
} catch (error) {
    res.status(401).json({
        message: "Invalid or expired token."
    });
}
}