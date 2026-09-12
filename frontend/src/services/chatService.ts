export async function sendChatMessage(message: string) {
    const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    });

    if(!response.ok) {
        throw new Error("Could not send message");
    }

    return response.json();
}