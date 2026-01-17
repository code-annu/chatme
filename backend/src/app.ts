import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript server!' });
});

export default app;
