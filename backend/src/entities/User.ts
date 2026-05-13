import { Address, Order, CartItem, ChatMessage } from './index';

export class User {
  constructor(
    public name: string,
    public email: string,
    private password_hash: string,
    public phone: string | null = null,
    public readonly created_at: Date = new Date(),
    public addresses: Address[] = [],
    public orders: Order[] = [],
    public cart_items: CartItem[] = [],
    public chat_messages: ChatMessage[] = [],
    public readonly id?: string
  ) {}

  public getPasswordHash(): string {
    return this.password_hash;
  }
}