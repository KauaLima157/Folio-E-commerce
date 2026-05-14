import { useState } from "react";
import { AuthContext } from "../context/authContext.js";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const profile = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) return;

    try {
      const res = await fetch(`http://localhost:3001/api/auth/profile/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await res.json();

      setUser(data.user);
      setToken(storedToken);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, profile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};