import type { UserRole } from './user';

export type RoleUsuario = UserRole;

export interface UsuarioAdmin {
  id: number;
  nome: string;
  email: string | null;
  role: RoleUsuario;
}

export function mapUserToUsuarioAdmin(user: {
  id: number;
  username: string;
  email: string | null;
  role: UserRole;
}): UsuarioAdmin {
  return {
    id: user.id,
    nome: user.username,
    email: user.email,
    role: user.role,
  };
}
