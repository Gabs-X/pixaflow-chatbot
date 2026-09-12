import { Chat } from "./components/Chat";

function App() {
  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-zinc-900">
            AI Chat
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Chat with Gemini
          </p>
        </header>

        <Chat />
      </div>
    </div>
  );
}

export default App;