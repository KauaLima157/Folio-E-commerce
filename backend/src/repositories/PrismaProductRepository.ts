import { IProductRepository } from '../interfaces';
import { Product } from '../entities';
import prisma from '../infrastructure/database';

export class PrismaProductRepository implements IProductRepository {
  async findAll(genre?: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: genre ? { genres: { has: genre } } : { is_active: true },
    });

    return products.map(p => new Product(
      p.title,
      p.description,
      p.authors,
      p.genres,
      Number(p.price),
      p.stock,
      p.is_active,
      p.id
    ));
  }

  async findById(id: string): Promise<Product | null> {
    const p = await prisma.product.findUnique({ where: { id } });
    if (!p) return null;

    return new Product(
      p.title,
      p.description,
      p.authors,
      p.genres,
      Number(p.price),
      p.stock,
      p.is_active,
      p.id
    );
  }

  async search(query: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        is_active: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { authors: { has: query } },
        ],
      },
    });

    return products.map(p => new Product(
      p.title,
      p.description,
      p.authors,
      p.genres,
      Number(p.price),
      p.stock,
      p.is_active,
      p.id
    ));
  }

  async updateStock(id: string, quantity: number): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: { stock: quantity }
    });
  }

  async checkStock(id: string): Promise<number> {
    const p = await prisma.product.findUnique({
      where: { id },
      select: { stock: true }
    });
    return p ? p.stock : 0;
  }
}
