import { OrderItem } from './OrderItem';

export enum OrderStatus {
  PENDENTE = 'PENDENTE',
  PAGO = 'PAGO',
  ENVIADO = 'ENVIADO',
  CANCELADO = 'CANCELADO'
}

export class Order {
  constructor(
    public readonly user_id: string,
    public address_snapshot: string,
    public total_price_snapshot: number,
    public status: OrderStatus = OrderStatus.PENDENTE,
    public readonly created_at: Date = new Date(),
    public items: OrderItem[] = [], 
    public readonly id?: string
  ) {}
}
