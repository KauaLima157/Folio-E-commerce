import { Request, Response } from 'express';
import { AIService } from '../services/AIService';
import logger from '../infrastructure/logger';

export class ChatController {
  constructor(private aiService: AIService) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { userId, sessionId, message } = req.body;

      if (!userId || !sessionId || !message) {
        res.status(400).json({ error: "Parâmetros userId, sessionId e message são obrigatórios." });
        return;
      }

      const response = await this.aiService.execute(userId, sessionId, message);

      res.status(200).json({ response });
    } catch (error) {
           res.status(500).json({ error: "Erro interno ao processar a mensagem do chat." });
    }
  }
}
