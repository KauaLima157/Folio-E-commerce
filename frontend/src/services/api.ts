let API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
API_BASE_URL = API_BASE_URL.replace(/\/+$/, '');
if (!API_BASE_URL.endsWith('/api')) {
  API_BASE_URL = `${API_BASE_URL}/api`;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  authors: string[];
  genres: string[];
  price: number;
  stock: number;
  is_active: boolean;
}

export interface ChatResponse {
  response: string;
}

export const api = {
  async getProducts(genre?: string): Promise<Product[]> {
    const url = genre 
      ? `${API_BASE_URL}/products?genre=${encodeURIComponent(genre)}`
      : `${API_BASE_URL}/products`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos.');
    }
    return response.json();
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar o produto.');
    }
    return response.json();
  },

  async sendMessage(message: string, sessionId: string, userId: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        sessionId,
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Erro ao processar mensagem no chat.');
    }

    const data: ChatResponse = await response.json();
    return data.response;
  }
};

const COVER_MAP: Record<string, string> = {
  'dom casmurro': '/assets/livros/dom-casmurro_500_sem_fundo.png',
  'a metamorfose': '/assets/livros/kafkab_500_sem_fundo.png',
  'a cartomante': '/assets/livros/acartomanteb_500_sem_fundo.png',
  'anna karenina': '/assets/livros/anakarerinab.jpg',
  'anna karênina': '/assets/livros/anakarerinab.jpg',
  'a morte de ivan ilitch': '/assets/livros/ivan-ilitchb_500_sem_fundo.png',
  'memórias póstumas de brás cubas': '/assets/livros/memoriaspostumasb_500_sem_fundo.png',
  'memorias postumas de bras cubas': '/assets/livros/memoriaspostumasb_500_sem_fundo.png',
  'o processo': '/assets/livros/oprocessob.jpg',
  'fundação': '/assets/livros/fundação.jpg',
  'fundacao': '/assets/livros/fundação.jpg',
  'meditações': '/assets/livros/meditacoes.jpg',
  'meditacoes': '/assets/livros/meditacoes.jpg',
  'meditacões': '/assets/livros/meditacoes.jpg',
  'livro do desassossego': '/assets/livros/o livro do desassosego.jpg',
  'livro do desassosego': '/assets/livros/o livro do desassosego.jpg',
  'o livro do desassosego': '/assets/livros/o livro do desassosego.jpg',
  'orgulho e preconceito': '/assets/livros/orgulho e preconceito.jpg',
  'a rosa do povo': '/assets/livros/a rosa do povo.jpg',
  'assim falou zaratustra': '/assets/livros/assim falou zaratrusta.jpg',
  'assim falou zaratrusta': '/assets/livros/assim falou zaratrusta.jpg',
  'duna': '/assets/livros/duna.jpg',
  'o hobbit': '/assets/livros/o hobbit.jpg',
  'o morro dos ventos uivantes': '/assets/livros/o morro dos ventos uivantes.jpg',
  'o senhor dos anéis': '/assets/livros/senhor dos aneis.jpg',
  'o senhor dos aneis': '/assets/livros/senhor dos aneis.jpg',
  'senhor dos aneis': '/assets/livros/senhor dos aneis.jpg',
};

export const getBookCoverImage = (title: string): string | null => {
  const normalized = title.toLowerCase().trim();
  return COVER_MAP[normalized] || null;
};

