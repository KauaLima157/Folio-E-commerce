import { ChatMessage } from '../entities';

export interface IChatRepository {
  saveMessage(message: ChatMessage): Promise<ChatMessage>;
  getHistory(sessionId: string): Promise<ChatMessage[]>;
}
