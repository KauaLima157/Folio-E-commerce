import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flatMap(e => e)[0];
      return res.status(400).json({
        message: firstError || "Erro de validação",
        errors: fieldErrors
      });
    }

    req.body = result.data;

    next();
  };