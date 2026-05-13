import { IChatRepository } from '../interfaces';
import { ChatMessage, ChatRole } from '../entities';
import prisma from '../infrastructure/database';

export class PrismaChatRepository implements IChatRepository {
  async saveMessage(message: ChatMessage): Promise<ChatMessage> {
    const created = await prisma.chatMessage.create({
      data: {
        user_id: message.user_id,
        session_id: message.session_id,
        role: message.role as any,
        content: message.content,
        recommended_product_id: message.recommended_product_id,
        created_at: message.created_at
      }
    });

    return new ChatMessage(
      created.user_id,
      created.session_id,
      created.role as any,
      created.content,
      created.recommended_product_id,
      created.created_at,
      created.id
    );
  }

  async getHistory(sessionId: string): Promise<ChatMessage[]> {
    const messages = await prisma.chatMessage.findMany({
      where: { session_id: sessionId },
      orderBy: { created_at: 'asc' }
    });

    return messages.map(m => new ChatMessage(
      m.user_id,
      m.session_id,
      m.role as any,
      m.content,
      m.recommended_product_id,
      m.created_at,
      m.id
    ));
  }
}
