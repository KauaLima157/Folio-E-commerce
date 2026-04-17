import { Order, OrderStatus } from '../entities';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByUser(userId: string): Promise<Order[]>;
  updateStatus(id: string, status: OrderStatus): Promise<void>;
}
