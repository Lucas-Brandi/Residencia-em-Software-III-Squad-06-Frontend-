export type PRStatus = 'Aprovado' | 'Reprovado' | 'Em análise' | 'Aprovado com alertas'

export interface PullRequest {
  id: string
  title: string
  author: string
  status: PRStatus
}