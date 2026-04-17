export class Product {
  constructor(
    public title: string,
    public description: string,
    public authors: string[],
    public genres: string[],
    public price: number,
    private stock: number,
    public is_active: boolean = true,
    public readonly id?: string
  ) {}

  public getStock(): number {
    return this.stock;
  }

  public hasStock(quantity: number): boolean {
    return this.stock >= quantity;
  }

  public reduceStock(quantity: number): void {
    if (!this.hasStock(quantity)) {
      throw new Error(`Estoque insuficiente para o produto: ${this.title}`);
    }
    this.stock -= quantity;
  }

  public increaseStock(quantity: number): void {
    this.stock += quantity;
  }
}
