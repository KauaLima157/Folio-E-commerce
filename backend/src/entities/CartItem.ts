export class CartItem {
  constructor(
    public readonly user_id: string,
    public readonly product_id: string,
    public quantity: number,
    public readonly added_at: Date = new Date(),
    public readonly id?: string
  ) {}
}
