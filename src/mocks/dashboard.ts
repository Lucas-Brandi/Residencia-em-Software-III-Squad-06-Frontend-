import { Activity, Check, Minus, Search } from "lucide-react"
import type { StatCard, PullRequest, ChartData } from "@/types/dashboard"

export const statCards: StatCard[] = [
  { 
    title: "PRs Analisados", 
    value: 15, 
    change: "+20.1% Em relação ao mês passado", 
    icon: Search,
    className: "bg-gradient-to-br from-[#144F74] to-[#06314C]" // ← só no primeiro card do dashboard
  },
  { title: "PRs Aprovados",    value: 10, change: "+20% Em relação ao mês passado",   icon: Check    },
  { title: "PRs Reprovados",   value: 5,  change: "+17% Em relação ao mês passado",   icon: Minus    },
  { title: "Vulnerabilidades", value: 2,  change: "2 baixas",                         icon: Activity },
]

export const recentPRs: PullRequest[] = [
  { id: 24, title: "autenticação de usuário",       author: "Hina Silva",      status: "Em análise" },
  { id: 23, title: "resolve login validation bug",  author: "Paulo Andrade",   status: "Aprovado"   },
  { id: 22, title: "correct API response handling", author: "Evelyn Santos",   status: "Reprovado"  },
  { id: 21, title: "optimize list rendering",       author: "André Salgueiro", status: "Aprovado"   },
  { id: 20, title: "clean up unused code",          author: "Olivia Alves",    status: "Reprovado"  },
]

export const chartData: ChartData[] = [
  { day: "Dom", prs: 1 },
  { day: "Seg", prs: 6 },
  { day: "Ter", prs: 3 },
  { day: "Qua", prs: 7 },
  { day: "Qui", prs: 2 },
  { day: "Sex", prs: 5 },
  { day: "Sab", prs: 6 },
]