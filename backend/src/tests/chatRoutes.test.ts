import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import app from "../app";
import { askGemini } from "../services/geminiService";

vi.mock("../services/geminiService", () => ({
  askGemini: vi.fn(),
}));

describe("POST /api/chat", () => {
  const mockedAskGemini = vi.mocked(askGemini);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when message is missing", async () => {
    const response = await request(app)
      .post("/api/chat")
      .send({});

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      error: "Message is required",
    });
  });

  it("returns 200 with Gemini response", async () => {
    mockedAskGemini.mockResolvedValue("Hello from Gemini!");

    const response = await request(app)
      .post("/api/chat")
      .send({
        message: "Hello",
      });

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      reply: "Hello from Gemini!",
    });

    expect(mockedAskGemini).toHaveBeenCalledWith("Hello");
  });
});