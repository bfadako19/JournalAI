import { Request, Response } from "express";
import { registerUser, loginUser, generateToken } from "../services/authService.js";

export async function register(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            password.length < 8
        ) {
            res.status(400).json({
                message: "Valid email and password of at least 8 characters are required."
            });
            return;
        }

        const user = await registerUser(email.trim(), password);
        const token = generateToken(user.id);

        res.status(201).json({
            message: "User successfully registered",
            user,
            token
        });
    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
}
export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            res.status(400).json({
                message: "Email and password are required."
            });
            return;
        }

        const user = await loginUser(email.trim(), password);

        if (!user) {
            res.status(401).json({
                message: "Invalid email or password."
            });
            return;
        }

        const token = generateToken(user.id);

        res.status(200).json({
            message: "Login successful",
            user,
            token
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed"
        });
    }
}