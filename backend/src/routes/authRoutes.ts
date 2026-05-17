import { Router } from 'express';

import { PrismaUserRepository } from '../repositories/PrismaUserRepository';

import { AuthService } from '../services/authService';

import { AuthController } from '../controllers/authController';

import { authMiddleware } from '../middlewares/authMiddleware';

import { validate } from '../middlewares/validationMiddleware';
import { registerSchema, loginSchema } from '../validations/fieldsValidation';

export const authRoutes = Router();

const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post('/register', validate(registerSchema), (req, res) => authController.register(req, res));

authRoutes.post('/login', validate(loginSchema), (req, res) => authController.login(req, res));

authRoutes.get('/profile', authMiddleware, (req, res) => authController.profile(req, res));

