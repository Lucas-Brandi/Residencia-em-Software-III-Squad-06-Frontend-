export type Gravidade = 'Crítico' | 'Aviso' | 'Dica';
export type StatusRegra = 'Ativo' | 'Inativo';
export type CategoriaRegra =
  | 'segurança'
  | 'lógica'
  | 'estilo'
  | 'performance'
  | 'qualidade'
  | 'arquitetura'
  | 'frontend';

export interface Regra {
  id: string;
  titulo: string;
  descricao: string;
  categoria: CategoriaRegra;
  gravidade: Gravidade;
  status: StatusRegra;
  repositorio?: string;
  repositoryIds?: string[];
}
