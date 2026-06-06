import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { authRoutes } from './routes/authRoutes';
import logger from './infrastructure/logger';

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    credentials: true,
  })
);
app.use(express.json());

app.use('/api', routes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Folio Backend rodando na porta ${PORT}`);
  logger.info(`Servidor iniciado na porta ${PORT}`);
});
