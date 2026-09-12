import type { Request, Response } from "express";
import { askGemini } from "../services/geminiService";

export async function sendMessage( req: Request, res: Response) {
    const { message } = req.body;

    if (!message?.trim()) {
        return res.status(400).json({
            error: "Message is required",
        });
    }

    try {
        const reply = await askGemini(message);

        return res.json({ reply });
    } catch (error) {
        console.error("Error while generating response:", error);

        return res.status(500).json({
            error: "Could not generate a response",
        });
    }
}