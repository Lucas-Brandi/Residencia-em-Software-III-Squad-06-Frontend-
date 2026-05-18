import { http } from '@/services/http';

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

export const authService = {
  login: (dto: LoginDto) =>
    http<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(dto),
    }),
};
