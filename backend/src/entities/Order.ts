import { OrderItem } from './OrderItem';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED'
}

export class Order {
  constructor(
    public readonly user_id: string,
    public address_snapshot: string,
    public total_price_snapshot: number,
    public status: OrderStatus = OrderStatus.PENDING,
    public readonly created_at: Date = new Date(),
    public items: OrderItem[] = [], 
    public readonly id?: string
  ) {}
}
