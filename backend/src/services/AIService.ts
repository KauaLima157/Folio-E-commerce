import { GoogleGenerativeAI } from "@google/generative-ai";
import logger from "../infrastructure/logger";
import { 
  IProductRepository, 
  IChatRepository, 
  ICartRepository 
} from "../interfaces";
import { ChatMessage, ChatRole, CartItem } from "../entities";

export class AIService {
  private genAI: GoogleGenerativeAI;
  private tools: any[];
  private systemInstruction: string;

  constructor(
    private productRepository: IProductRepository,
    private chatRepository: IChatRepository,
    private cartRepository: ICartRepository
  ) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não encontrada");
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    
    this.tools = [
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

    this.systemInstruction = "Você é o assistente virtual da Folio, uma livraria elegante e moderna. Seu objetivo é ajudar os usuários a encontrar livros, dar recomendações personalizadas e gerenciar o carrinho. Seja educado, culto e apaixonado por literatura. Use as ferramentas disponíveis para consultar dados reais do catálogo. IMPORTANTE: Se o usuário perguntar algo que não tenha relação com livros ou com a livraria Folio, responda de forma genérica e curta, pedindo gentilmente para que ele faça perguntas apenas sobre nossos serviços ou catálogo literário.";
  }

  async execute(userId: string, sessionId: string, userMessage: string): Promise<string> {
    // Priority order of models to try in case of 503 Service Unavailable or 429 Rate Limits
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-3-flash",
      "gemini-3.1-flash-lite",
      "gemini-2.5-flash-lite",
      "gemini-flash-latest" // backup legacy alias
    ];

    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        logger.info(`Tentando processar chat usando o modelo: ${modelName}`);

        const modelInstance = this.genAI.getGenerativeModel({
          model: modelName,
          tools: this.tools as any,
          systemInstruction: this.systemInstruction
        });

        const history = await this.chatRepository.getHistory(sessionId);
        
        const contents = history.map(msg => ({
          role: msg.role === ChatRole.USER ? "user" : "model",
          parts: [{ text: msg.content }]
        }));

        const chat = modelInstance.startChat({ history: contents });

        let result = await chat.sendMessage(userMessage);
        let response = result.response;

        const candidate = response.candidates?.[0];
        const callPart = candidate?.content?.parts?.find((p: any) => p.functionCall) as any;
        
        if (callPart && callPart.functionCall) {
          const { name, args } = callPart.functionCall;
          let toolResult;

          logger.info(`IA [${modelName}] solicitou ferramenta: ${name}`, args);

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

        // Save conversation to the database once succeeded
        await this.chatRepository.saveMessage(new ChatMessage(userId, sessionId, ChatRole.USER, userMessage));
        await this.chatRepository.saveMessage(new ChatMessage(userId, sessionId, ChatRole.ASSISTANT, finalContent));

        logger.info(`Sucesso ao obter resposta com o modelo: ${modelName}`);
        return finalContent;

      } catch (error: any) {
        logger.warn(`Modelo ${modelName} falhou: ${error.message}`);
        lastError = error;
        // Proceed to next model in loop
      }
    }

    // Fallback if all models fail
    logger.error("Todos os modelos do Gemini falharam ao tentar responder:", lastError);
    return "Desculpe, todos os nossos assistentes de IA estão enfrentando uma alta demanda no momento. Por favor, tente enviar sua mensagem novamente em alguns instantes!";
  }
}
