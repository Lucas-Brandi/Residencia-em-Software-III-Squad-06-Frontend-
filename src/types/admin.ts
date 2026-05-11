export type RoleUsuario = 'Reviewer' | 'Admin' | 'Dev';
export type StatusUsuario = 'Ativo' | 'Pendente';

export interface UsuarioAdmin {
  id: string;
  nome: string;
  role: RoleUsuario;
  status: StatusUsuario;
  ultimoAcesso: string;
}
