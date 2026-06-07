import { IProductRepository } from '../interfaces';
import { Product } from '../entities';
import prisma from '../infrastructure/database';

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getLevenshteinDistance(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

function matchesFuzzy(query: string, target: string): boolean {
  const normQuery = normalizeText(query).trim();
  const normTarget = normalizeText(target).trim();
  
  if (!normQuery) return false;

  // 1. Direct substring match
  if (normTarget.includes(normQuery) || normQuery.includes(normTarget)) {
    return true;
  }

  // 2. Fuzzy match word by word
  const queryWords = normQuery.split(/\s+/);
  const targetWords = normTarget.split(/\s+/);

  for (const qWord of queryWords) {
    if (qWord.length < 2) continue;
    for (const tWord of targetWords) {
      if (tWord.length < 2) continue;
      
      const distance = getLevenshteinDistance(qWord, tWord);
      const maxDistance = qWord.length <= 4 ? 1 : 2;
      if (distance <= maxDistance) {
        return true;
      }
    }
  }

  return false;
}

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
      where: { is_active: true },
    });

    const filtered = products.filter(p => {
      // Check title
      if (matchesFuzzy(query, p.title)) return true;
      
      // Check authors
      for (const author of p.authors) {
        if (matchesFuzzy(query, author)) return true;
      }

      return false;
    });

    return filtered.map(p => new Product(
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
