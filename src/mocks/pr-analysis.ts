import type { PRAnalysis, Finding, TimelineEvent  } from "@/types/pr-analysis"

export const prAnalysisMock: PRAnalysis = {
  id: 24,
  title: "Ajuste na autenticação de usuário",
  repository: "AI Merge Reviewer",
  author: "Olivia Silva",
  githubUsername: "iancacarregosa", 
  sentAt: "15 de Janeiro, 2026",
  score: 85,
  summary: "A qualidade geral do código é boa, focando em clareza e segurança. No entanto, pequenas melhorias são recomendadas no tratamento de erros e na adesão ao Princípio de Responsabilidade Única (SRP). Por favor, revise as descobertas específicas abaixo.",
}

export const findings: Finding[] = [
  {
    id: 1,
    type: "critico",
    category: "seguranca",
    title: "Exposição de Chave de API em /api/config.ts - Linha 32",
    description: "A variável AUTH_SERVICE_KEY é provavelmente uma chave de API e está 'hardcoded'. Ela deve ser movida para variáveis de ambiente para segurança. Corrigir isso é uma prioridade alta.",
  },
  {
    id: 2,
    type: "aviso",
    category: "solid-logica",
    title: "Violação de Complexidade em /auth/service.ts - Linhas 50-75",
    description: "A função validateCredentials está se tornando complexa demais. Considere dividi-la em funções menores e focadas. Adere ao princípio SRP.",
  },
  {
    id: 3,
    type: "boa-pratica",
    category: "estilo-docs",
    title: "Boa Prática: JSDoc adicionado para a função generateToken.",
    description: "A documentação JSDoc foi adicionada corretamente, melhorando a legibilidade e manutenção do código.",
  },
  {
    id: 4,
    type: "critico",
    category: "seguranca",
    title: "SQL Injection em /api/users.ts - Linha 87",
    description: "Query construída com concatenação de string direta. Use prepared statements para evitar SQL injection.",
  },
  {
    id: 5,
    type: "aviso",
    category: "solid-logica",
    title: "Função com múltiplas responsabilidades em /auth/controller.ts",
    description: "O método handleLogin faz validação, autenticação e logging ao mesmo tempo. Separe em funções distintas.",
  },
]

export const timeline: TimelineEvent[] = [
  { id: 1, label: "PR #142 aberto",          time: "11:05 AM" },
  { id: 2, label: "Análise da IA Iniciada",   time: "11:06 AM" },
  { id: 3, label: "Análise Concluída",        time: "11:08 AM" },
  { id: 4, label: "Status: Aguardando Revisão Humana", time: "" },
]