import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }

  return context;
};