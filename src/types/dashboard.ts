import type { LucideIcon } from "lucide-react"

export interface StatCard {
  title: string
  value: number
  change: string
  icon: LucideIcon
  className?: string 
}

export interface PullRequest {
  id: number
  title: string
  author: string
  status: "Em análise" | "Aprovado" | "Reprovado"
}

export interface ChartData {
  day: string
  prs: number
}