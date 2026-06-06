import {
  useEffect,
  useState,
} from "react";

import { AuthContext }
from "./authContext";

interface User {
  id: string;
  email: string;
}

let BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
BASE_URL = BASE_URL.replace(/\/+$/, '');
if (!BASE_URL.endsWith('/api')) {
  BASE_URL = `${BASE_URL}/api`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const profile = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse( storedToken )}`,
          },
        }
      );
      const data = await res.json();

      setUser(data.user);

      setToken(storedToken);

    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    profile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        profile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}