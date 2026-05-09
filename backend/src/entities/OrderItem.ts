export class OrderItem {
  constructor(
    public readonly order_id: string,
    public readonly product_id: string,
    public product_name_snapshot: string,
    public product_price_snapshot: number,
    public quantity: number,
    public subtotal: number,
    public readonly id?: string
  ) {}
}
