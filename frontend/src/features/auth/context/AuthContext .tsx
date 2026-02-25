import { useEffect, useState } from "react";
import type {
  UserLogin,
  UserRegister,
  UserResponse,
} from "../interfaces/authInterfaces";
import {
  getMyProfile,
  loginUser,
  registerUser,
} from "../services/authServices";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      if (window.location.pathname === "/server-down") {
        setIsLoading(false);
        return;
      }
      const token = localStorage.getItem("felix_token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const profile = await getMyProfile();
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (userData: UserLogin) => {
    const { token } = await loginUser(userData);
    localStorage.setItem("felix_token", token);
    const profile = await getMyProfile();
    setUser(profile);
  };

  const register = async (userData: UserRegister) => {
    await registerUser(userData);
    await login({ email: userData.email, password: userData.password });
  };

  const logout = () => {
    localStorage.removeItem("felix_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
