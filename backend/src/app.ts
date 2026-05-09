import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Logger from './infrastructure/logger';

// Load env
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
  Logger.http(`${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

export default app;
