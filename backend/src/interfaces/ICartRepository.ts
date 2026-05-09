import { CartItem } from '../entities';

export interface ICartRepository {
  addItem(item: CartItem): Promise<CartItem>;
  removeItem(userId: string, productId: string): Promise<void>;
  updateQuantity(userId: string, productId: string, quantity: number): Promise<void>;
  getCartByUser(userId: string): Promise<CartItem[]>;
  clearCart(userId: string): Promise<void>;
}
