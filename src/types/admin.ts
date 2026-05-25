import type { User, UserRole, UserStatus } from './user'

export type RoleUsuario = UserRole;
export type StatusUsuario = UserStatus;

export interface UsuarioAdmin {
  id: number;
  nome: string;
  email: string | null;
  role: RoleUsuario;
  status: StatusUsuario;
  ultimoAcesso: string;
}

// Função utilitária para mapear User da API para UsuarioAdmin
export function mapUserToUsuarioAdmin(user: User): UsuarioAdmin {
  return {
    id: user.id,
    nome: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
    ultimoAcesso: 'Não especificado',
  };
}
