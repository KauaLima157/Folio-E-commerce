const API_URL = "http://localhost:3001/api/auth";

type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
};

export class AuthService {
  async signUp(name: string, email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || "Erro ao cadastrar");
    }

    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || "Erro ao logar");
    }

    return data;
  }

  async logout(): Promise<void> {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Erro ao fazer logout");
    }
  }
}