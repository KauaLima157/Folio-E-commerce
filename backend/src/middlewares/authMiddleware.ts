import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function authMiddleware( req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization?.split(" ")[1];

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token não informado',
    });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify( token, process.env.SECRET_JWT! );

    const { sub } = decoded as IPayload;

    req.user = {
      id: sub,
    };

    next();
  } catch {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
}