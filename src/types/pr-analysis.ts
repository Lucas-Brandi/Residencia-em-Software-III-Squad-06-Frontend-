export interface PRAnalysis {
  id: number
  title: string
  repository: string
  author: string
  githubUsername: string
  sentAt: string
  score: number
  summary: string
}

export type FindingType = "critico" | "aviso" | "boa-pratica"
export type FindingCategory = "todas" | "seguranca" | "solid-logica" | "estilo-docs"

export interface Finding {
  id: number
  type: FindingType
  category: FindingCategory 
  title: string
  description: string
}