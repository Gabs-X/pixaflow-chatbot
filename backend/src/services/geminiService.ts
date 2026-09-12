import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";

const ai = new GoogleGenAI({
  apiKey: env.geminiApiKey,
});

export async function askGemini(message: string) {
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: message,
  });

  return interaction.output_text;
}