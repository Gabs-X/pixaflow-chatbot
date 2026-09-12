import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
    res.json({ status: "ok" });
});

app.use("/api/chat", chatRoutes);

export default app;