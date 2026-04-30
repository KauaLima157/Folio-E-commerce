import { GoogleGenerativeAI, DynamicRetrievalMode } from "@google/generative-ai";
import logger from "../infrastructure/logger";
import { 
  IProductRepository, 
  IChatRepository, 
  ICartRepository 
} from "../interfaces";
import { ChatMessage, ChatRole, CartItem } from "../entities";

export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(
    private productRepository: IProductRepository,
    private chatRepository: IChatRepository,
    private cartRepository: ICartRepository,
    private modelName: "gemini-flash-latest" | "gemini-flash-lite-latest" = "gemini-flash-latest"
  ) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não encontrada");
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    
    const tools = [
      {
        functionDeclarations: [
          {
            name: "searchBooks",
            description: "Busca livros no catálogo por título ou autor.",
            parameters: {
              type: "OBJECT",
              properties: {
                query: { type: "STRING", description: "O termo de busca (ex: nome do livro ou autor)" }
              },
              required: ["query"]
            }
          },
          {
            name: "listAllBooks",
            description: "Lista livros do catálogo, opcionalmente filtrando por gênero.",
            parameters: {
              type: "OBJECT",
              properties: {
                genre: { type: "STRING", description: "O gênero dos livros (ex: Fantasia, Romance)" }
              }
            }
          },
          {
            name: "addToCart",
            description: "Adiciona um livro ao carrinho de compras do usuário.",
            parameters: {
              type: "OBJECT",
              properties: {
                productId: { type: "STRING", description: "O ID único do produto" },
                quantity: { type: "NUMBER", description: "A quantidade a ser adicionada" }
              },
              required: ["productId", "quantity"]
            }
          }
        ]
      }
    ];

    this.model = this.genAI.getGenerativeModel({
      model: this.modelName,
      tools: tools as any,
      systemInstruction: "Você é o assistente virtual da Folio, uma livraria elegante e moderna. Seu objetivo é ajudar os usuários a encontrar livros, dar recomendações personalizadas e gerenciar o carrinho. Seja educado, culto e apaixonado por literatura. Use as ferramentas disponíveis para consultar dados reais do catálogo. IMPORTANTE: Se o usuário perguntar algo que não tenha relação com livros ou com a livraria Folio, responda de forma genérica e curta, pedindo gentilmente para que ele faça perguntas apenas sobre nossos serviços ou catálogo literário."
    });
  }

  async execute(userId: string, sessionId: string, userMessage: string): Promise<string> {
    try {
      const history = await this.chatRepository.getHistory(sessionId);
      
      const contents = history.map(msg => ({
        role: msg.role === ChatRole.USER ? "user" : "model",
        parts: [{ text: msg.content }]
      }));

      const chat = this.model.startChat({ history: contents });

      let result = await chat.sendMessage(userMessage);
      let response = result.response;

      const call = response.candidates[0].content.parts.find((p: any) => p.functionCall);
      
      if (call) {
        const { name, args } = call.functionCall;
        let toolResult;

        logger.info(`IA solicitou ferramenta: ${name}`, args);

        if (name === "searchBooks") {
          toolResult = await this.productRepository.search(args.query);
        } else if (name === "listAllBooks") {
          toolResult = await this.productRepository.findAll(args.genre);
        } else if (name === "addToCart") {
          await this.cartRepository.addItem(new CartItem(userId, args.productId, args.quantity));
          toolResult = { success: true, message: "Produto adicionado ao carrinho!" };
        }

        result = await chat.sendMessage([{
          functionResponse: {
            name,
            response: { content: toolResult }
          }
        }]);
        response = result.response;
      }

      const finalContent = response.text();

      await this.chatRepository.saveMessage(new ChatMessage(userId, sessionId, ChatRole.USER, userMessage));
      await this.chatRepository.saveMessage(new ChatMessage(userId, sessionId, ChatRole.ASSISTANT, finalContent));

      return finalContent;
    } catch (error) {
      logger.error("Erro no AIService:", error);
      return "Desculpe, tive um problema ao processar sua mensagem. Poderia tentar novamente?";
    }
  }
}
