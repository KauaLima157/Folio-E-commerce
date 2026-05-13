import { Request, Response } from 'express';

import { AuthService } from '../services/authService';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone } = req.body;

      const result = await this.authService.register({ name, email, password, phone });

      return res.status(201).json({ success: true, message: "registro feito com sucesso!", register: result });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async login( req: Request, res: Response ) {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login({ email, password });

      return res.status(200).json({ success: true, message: "logado com sucesso!", login: result });

    } catch (error: any) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }

  async profile( req: Request, res: Response ) {
    try {
      const { id } = req.user;

      const user = await this.authService.profile(id);

      return res.status(200).json({ success: true, message: "perfil encontrado com sucesso!", user: user });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}
