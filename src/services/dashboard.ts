import type { PullRequest } from '@/types/pull-request';
import { Activity, Check, Minus, Search } from 'lucide-react';

export function buildStatCards(prs: PullRequest[]) {
  return [
    {
      title: 'PRs Analisados',
      value: prs.length,
      change: 'No período selecionado',
      icon: Search,
      className: 'bg-gradient-to-br from-[#144F74] to-[#06314C]',
    },
    {
      title: 'PRs Abertos',
      value: prs.filter((pr) => pr.status === 'aberto').length,
      change: 'No período selecionado',
      icon: Check,
    },
    {
      title: 'PRs Mergeados',
      value: prs.filter((pr) => pr.status === 'mergeado').length,
      change: 'No período selecionado',
      icon: Minus,
    },
    {
      title: 'PRs Fechados',
      value: prs.filter((pr) => pr.status === 'fechado').length,
      change: 'No período selecionado',
      icon: Activity,
    },
  ];
}
