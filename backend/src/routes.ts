import { Router } from 'express';
import { 
  PrismaUserRepository, 
  PrismaProductRepository, 
  PrismaChatRepository, 
  PrismaCartRepository 
} from './repositories';
import { AIService } from './services/AIService';
import { ChatController } from './controllers/ChatController';
import { ProductController } from './controllers/ProductController';

const routes = Router();

const userRepository = new PrismaUserRepository();
const productRepository = new PrismaProductRepository();
const chatRepository = new PrismaChatRepository();
const cartRepository = new PrismaCartRepository();

const aiService = new AIService(productRepository, chatRepository, cartRepository);

const chatController = new ChatController(aiService);
const productController = new ProductController(productRepository);

routes.post('/chat', (req, res) => chatController.handle(req, res));

routes.get('/products', (req, res) => productController.index(req, res));
routes.get('/products/:id', (req, res) => productController.show(req, res));

export { routes };
