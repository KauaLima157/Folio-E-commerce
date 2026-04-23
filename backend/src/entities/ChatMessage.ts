export enum ChatRole {
  USER = 'user',
  ASSISTANT = 'assistant'
}

export class ChatMessage {
  constructor(
    public readonly user_id: string,
    public readonly session_id: string,
    public role: ChatRole,
    public content: string,
    public recommended_product_id?: string | null,
    public readonly created_at: Date = new Date(),
    public readonly id?: string
  ) {}
}
