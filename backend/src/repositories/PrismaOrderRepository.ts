import { IOrderRepository } from '../interfaces';
import { Order, OrderStatus } from '../entities';
import prisma from '../infrastructure/database';

export class PrismaOrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    const created = await prisma.order.create({
      data: {
        user_id: order.user_id,
        address_snapshot: order.address_snapshot,
        total_price_snapshot: order.total_price_snapshot,
        status: order.status as any,
        created_at: order.created_at,
      }
    });

    return new Order(
      created.user_id,
      created.address_snapshot,
      Number(created.total_price_snapshot),
      created.status as any,
      created.created_at,
      [],
      created.id
    );
  }

  async findById(id: string): Promise<Order | null> {
    const o = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });
    if (!o) return null;

    return new Order(
      o.user_id,
      o.address_snapshot,
      Number(o.total_price_snapshot),
      o.status as any,
      o.created_at,
      [], 
      o.id
    );
  }

  async findByUser(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });

    return orders.map(o => new Order(
      o.user_id,
      o.address_snapshot,
      Number(o.total_price_snapshot),
      o.status as any,
      o.created_at,
      [],
      o.id
    ));
  }

  async updateStatus(id: string, status: OrderStatus): Promise<void> {
    await prisma.order.update({
      where: { id },
      data: { status: status as any }
    });
  }
}
