import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito grande"),

  email: z
    .string()
    .email("Email inválido"),

  password: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .regex(/[A-Z]/, "Senha precisa ter letra maiúscula")
    .regex(/[a-z]/, "Senha precisa ter letra minúscula")
    .regex(/[0-9]/, "Senha precisa ter número")
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email inválido"),

  password: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .regex(/[A-Z]/, "Senha precisa ter letra maiúscula")
    .regex(/[a-z]/, "Senha precisa ter letra minúscula")
    .regex(/[0-9]/, "Senha precisa ter número")
});