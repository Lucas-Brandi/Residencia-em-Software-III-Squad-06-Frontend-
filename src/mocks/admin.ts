import { StatCard } from '@/types/dashboard';
import { UsuarioAdmin } from '@/types/admin';
import { GitPullRequest, Clock, Users, Key } from 'lucide-react';

export const adminStatCards: StatCard[] = [
  {
    title: 'PRs Analisados',
    value: 15,
    change: '+20.1% mês',
    icon: GitPullRequest,
    className: 'bg-gradient-to-br from-[#144F74] to-[#06314C]',
  },
  {
    title: 'Economia de Tempo',
    value: 215,
    change: 'Equivale a 2 Devs',
    icon: Clock,
  },
  {
    title: 'Usuários Ativos',
    value: 12,
    change: '3 Pendentes',
    icon: Users,
  },
  {
    title: 'Chaves API Ativas',
    value: 2,
    change: 'Revisar em 60 dias',
    icon: Key,
  },
];

export const mockUsuarios: UsuarioAdmin[] = [
  {
    id: '#01',
    nome: 'Olivia Silva',
    role: 'Reviewer',
    status: 'Ativo',
    ultimoAcesso: '15 Jan, 2026',
  },
  {
    id: '#02',
    nome: 'Admin User',
    role: 'Admin',
    status: 'Ativo',
    ultimoAcesso: '14 Jan, 2026',
  },
  {
    id: '#03',
    nome: 'New Dev',
    role: 'Dev',
    status: 'Pendente',
    ultimoAcesso: '21 Fev, 2026',
  },
];
