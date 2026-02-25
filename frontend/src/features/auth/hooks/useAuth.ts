import { useContext } from "react";
import type { AuthContextType } from "../interfaces/authInterfaces";
import { AuthContext } from "../context/authContext";



export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve essere usato dentro <AuthProvider>");
  }
  return context;
};