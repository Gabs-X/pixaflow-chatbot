import type { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { sendMessage } from "../controllers/chatController";
import { askGemini } from "../services/geminiService";

vi.mock("../services/geminiService", () => ({
  askGemini: vi.fn(),
}));

describe("chatController", () => {
  const mockedAskGemini = vi.mocked(askGemini);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when message is empty", async () => {
    const request = {
      body: {
        message: "",
      },
    } as Request;

    const json = vi.fn();

    const response = {
      status: vi.fn().mockReturnValue({ json }),
      json,
    } as unknown as Response;

    await sendMessage(request, response);

    expect(response.status).toHaveBeenCalledWith(400);

    expect(json).toHaveBeenCalledWith({
      error: "Message is required",
    });

    expect(mockedAskGemini).not.toHaveBeenCalled();
  });

  it("returns Gemini response when message is valid", async () => {
    mockedAskGemini.mockResolvedValue("Hello! How can I help you?");

    const request = {
      body: {
        message: "Hello",
      },
    } as Request;

    const json = vi.fn();

    const response = {
      status: vi.fn(),
      json,
    } as unknown as Response;

    await sendMessage(request, response);

    expect(mockedAskGemini).toHaveBeenCalledWith("Hello");

    expect(json).toHaveBeenCalledWith({
      reply: "Hello! How can I help you?",
    });
  });
});