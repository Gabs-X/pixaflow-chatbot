import "dotenv/config";

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  throw new Error(
    "Missing required environment variable: GEMINI_API_KEY"
  );
}

export const env = {
  geminiApiKey,
  port: Number(process.env.PORT ?? 3001),
};