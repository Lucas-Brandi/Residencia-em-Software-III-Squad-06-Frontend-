import type { PullRequest } from '@/types/pull-request'

export const mockPullRequests: PullRequest[] = [
  { id: '024', title: 'Ajuste na autenticação de usuário',          author: 'Olivia Silva',    status: 'Em análise'          },
  { id: '023', title: 'Correção de bug de cores do Dashboard',      author: 'Yuri Santos',     status: 'Aprovado'            },
  { id: '022', title: 'Organização dos cards de métricas',          author: 'Luiza Martins',   status: 'Aprovado com alertas'},
  { id: '021', title: 'Redesign do novo header',                    author: 'Lara Silveira',   status: 'Aprovado'            },
  { id: '020', title: 'Organizando componentes',                    author: 'André Salgueiro', status: 'Reprovado'           },
  { id: '019', title: 'Biblioteca nova adicionada',                 author: 'Harry Tavares',   status: 'Aprovado'            },
  { id: '018', title: 'Padronização de espaçamentos',               author: 'Pedro Jackson',   status: 'Em análise'          },
  { id: '017', title: 'Criação de componente de gráfico',           author: 'Anna Beatriz C.', status: 'Aprovado'            },
  { id: '016', title: 'Criação dos cards de estatísticas de PR',    author: 'Louise Rossi',    status: 'Aprovado com alertas'},
  { id: '015', title: 'Melhorias de responsividade',                author: 'Taylor Fontes',   status: 'Aprovado'            },
  { id: '014', title: 'Melhorias no tratamento de erros',           author: 'Alita Alves',     status: 'Reprovado'           },
  { id: '013', title: 'Atualizações de acordo com documentação',    author: 'Gabriel Rocha',   status: 'Aprovado'            },
]