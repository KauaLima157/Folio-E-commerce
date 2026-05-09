const API_BASE_URL = 'http://localhost:3001/api';

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

  async sendMessage(message: string, sessionId: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'usuario-teste-1',
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
