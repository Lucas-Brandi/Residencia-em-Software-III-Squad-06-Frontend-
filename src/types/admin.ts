import type { UserRole, UserStatus } from './user';

export type RoleUsuario = UserRole;
export type StatusUsuario = UserStatus;

export interface UsuarioAdmin {
  id: number;
  nome: string;
  email: string | null;
  role: RoleUsuario;
  status: StatusUsuario;
}

export function mapUserToUsuarioAdmin(user: {
  id: number;
  username: string;
  email: string | null;
  role: UserRole;
  status: UserStatus;
}): UsuarioAdmin {
  return {
    id: user.id,
    nome: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}
