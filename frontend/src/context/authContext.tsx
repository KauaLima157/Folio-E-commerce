import { createContext } from "react";

interface User {
  id: string;
  email: string;
}

export interface AuthContextInterface {
  user: User | null;
  token: string | null;
  profile: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);