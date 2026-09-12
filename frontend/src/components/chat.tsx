import { FormEvent, useState } from "react";
import { sendChatMessage } from "../services/chatService";
import type { Message } from "../types/chat";

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const text = input.trim();

    if (!text || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await sendChatMessage(text);

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "bot",
      };

      setMessages((current) => [...current, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Something went wrong. Please try again.",
        sender: "bot",
      };

      setMessages((current) => [...current, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex min-h-[500px] max-h-[65vh] flex-col gap-3 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-zinc-400">
              Send a message to start the conversation.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
              message.sender === "user"
                ? "ml-auto bg-zinc-900 text-white"
                : "mr-auto bg-zinc-100 text-zinc-800"
            }`}
          >
            {message.text}
          </div>
        ))}

        {isLoading && (
          <div className="mr-auto rounded-xl bg-zinc-100 px-4 py-2.5 text-sm text-zinc-500">
            Thinking...
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-zinc-200 p-4"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm outline-none transition focus:border-zinc-500"
        />

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}