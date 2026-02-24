import { axiosInstance } from "../../../core/api/axiosInstance";
import type { LoginResponse, UserLogin, UserRegister, UserResponse } from "../interfaces/authInterfaces"


export const registerUser = async (userData: UserRegister): Promise<UserResponse> => {
    const response = await axiosInstance.post<UserResponse>("/auth/register", userData);
    return response.data;
}

export const loginUser = async (userData: UserLogin): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", userData);
  return response.data;
};

export const getMyProfile = async (): Promise<UserResponse> => {
    const response = await axiosInstance.get<UserResponse>("/user/me");
  return response.data;
}