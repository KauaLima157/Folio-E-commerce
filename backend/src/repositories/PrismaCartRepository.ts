import { ICartRepository } from '../interfaces';
import { CartItem } from '../entities';
import prisma from '../infrastructure/database';

export class PrismaCartRepository implements ICartRepository {
  async addItem(item: CartItem): Promise<CartItem> {
    const created = await prisma.cartItem.upsert({
      where: {
        user_id_product_id: {
          user_id: item.user_id,
          product_id: item.product_id
        }
      },
      update: {
        quantity: { increment: item.quantity }
      },
      create: {
        user_id: item.user_id,
        product_id: item.product_id,
        quantity: item.quantity
      }
    });

    return new CartItem(
      created.user_id,
      created.product_id,
      created.quantity,
      created.added_at,
      created.id
    );
  }

  async removeItem(userId: string, productId: string): Promise<void> {
    await prisma.cartItem.delete({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId
        }
      }
    });
  }

  async updateQuantity(userId: string, productId: string, quantity: number): Promise<void> {
    await prisma.cartItem.update({
      where: {
        user_id_product_id: {
          user_id: userId,
          product_id: productId
        }
      },
      data: { quantity }
    });
  }

  async getCartByUser(userId: string): Promise<CartItem[]> {
    const items = await prisma.cartItem.findMany({
      where: { user_id: userId }
    });

    return items.map(i => new CartItem(
      i.user_id, i.product_id, i.quantity, i.added_at, i.id
    ));
  }

  async clearCart(userId: string): Promise<void> {
    await prisma.cartItem.deleteMany({
      where: { user_id: userId }
    });
  }
}
