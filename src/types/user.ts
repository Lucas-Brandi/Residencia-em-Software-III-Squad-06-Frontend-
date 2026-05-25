export type UserRole = 'USER' | 'ADMIN'
export type UserStatus = 'ATIVO' | 'PENDENTE' | 'INATIVO'

export interface User {
  id: number
  username: string
  email: string | null
  githubUsername: string | null
  avatarUrl: string | null
  role: UserRole
  status: UserStatus
  resetToken: string | null
}

export interface CreateUserDto {
  username: string
  email?: string
  password: string
  role: UserRole
  githubUsername?: string
  avatarUrl?: string
}

export interface UpdateUserDto {
  username?: string
  email?: string
  password?: string
  role?: UserRole
  status?: UserStatus
  githubUsername?: string
  avatarUrl?: string
}