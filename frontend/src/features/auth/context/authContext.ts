import { createContext } from "react";
import type { AuthContextType } from "../interfaces/authInterfaces";

export const AuthContext = createContext<AuthContextType | null>(null);