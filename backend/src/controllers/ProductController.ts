import { Request, Response } from 'express';
import { IProductRepository } from '../interfaces';

export class ProductController {
  constructor(private productRepository: IProductRepository) {}

  async index(req: Request, res: Response): Promise<void> {
    try {
      const genre = req.query.genre;
      const products = await this.productRepository.findAll(typeof genre === 'string' ? genre : undefined);
      
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos." });
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productRepository.findById(id as string);

      if (!product) {
        res.status(404).json({ error: "Produto não encontrado." });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar o produto." });
    }
  }
}
