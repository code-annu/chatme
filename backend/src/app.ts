import "reflect-metadata";
import express from "express";
import cors from "cors";
import { authRouter } from "./api/router/auth-router";
import { profileRouter } from "./api/router/profile-router";
import { errorHandler } from "./api/middleware/handle-error";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use(errorHandler);

export default app;
