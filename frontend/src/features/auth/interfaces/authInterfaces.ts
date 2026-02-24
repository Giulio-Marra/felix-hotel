export interface UserRegister {
    name: string;
    surname: string;
    email: string;
    password: string;
    numTel: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
  numTel: string;
  role: string;
}

