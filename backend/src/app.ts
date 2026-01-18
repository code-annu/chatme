import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import dns from "dns";
import { authRouter } from "./api/router/auth-router";
import { profileRouter } from "./api/router/profile-router";
import { errorHandler } from "./api/middleware/handle-error";

const app: Express = express();

dns.setServers(["[8.8.8.8]", "[8.8.4.4]"]);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript server!" });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);

app.use(errorHandler);

export default app;
