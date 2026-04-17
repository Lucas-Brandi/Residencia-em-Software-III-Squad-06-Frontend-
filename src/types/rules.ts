export type Gravidade = 'Crítico' | 'Aviso' | 'Dica';
export type StatusRegra = 'Ativo' | 'Inativo';
export type CategoriaRegra =
  | 'Segurança'
  | 'Lógica'
  | 'Estilo'
  | 'Performance'
  | 'Qualidade'
  | 'Arquitetura'
  | 'Frontend';

export interface Regra {
  id: string;
  titulo: string;
  categoria: CategoriaRegra;
  gravidade: Gravidade;
  status: StatusRegra;
}
