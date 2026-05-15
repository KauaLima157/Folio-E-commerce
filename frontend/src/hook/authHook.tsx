import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }

  return auth;
};