import { Product } from '../entities';

export interface IProductRepository {
  findAll(genre?: string): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  search(query: string): Promise<Product[]>;
  updateStock(id: string, quantity: number): Promise<void>;
  checkStock(id: string): Promise<number>;
}
