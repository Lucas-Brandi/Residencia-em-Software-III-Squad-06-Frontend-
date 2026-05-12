export type UserRole = 'dev' | 'admin';

export interface User {
  id: number;
  username: string;
  githubUsername: string | null;
  avatarUrl: string | null;
  role: UserRole;
  resetToken: string | null;
}

export interface CreateUserDto {
  username: string;
  password: string;
  role: UserRole;
  githubUsername?: string;
  avatarUrl?: string;
}

export interface UpdateUserDto {
  password?: string;
  role?: UserRole;
}
