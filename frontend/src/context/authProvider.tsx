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
        "http://localhost:3001/api/auth/profile",
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