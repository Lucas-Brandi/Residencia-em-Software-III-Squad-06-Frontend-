import * as React from 'react';
import { usersService } from '@/services/users';
import { pullRequestsService } from '@/services/pull-requests';
import { adminDashboardService, type AdminMetrics } from '@/services/admin';
import { mapUserToUsuarioAdmin } from '@/types/admin';
import { GitPullRequest, Clock, Users, Key } from 'lucide-react';
import type { UsuarioAdmin, RoleUsuario } from '@/types/admin';

export function useAdmin() {
  const [usuarios, setUsuarios] = React.useState<UsuarioAdmin[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [tick, setTick] = React.useState(0);
  const [totalPRs, setTotalPRs] = React.useState(0);
  const [metrics, setMetrics] = React.useState<AdminMetrics | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    Promise.all([
      usersService.getAll(),
      pullRequestsService.getAll(),
      adminDashboardService.getMetrics(),
    ])
      .then(([users, prs, metricsData]) => {
        if (cancelled) return;

        setUsuarios(users.map(mapUserToUsuarioAdmin));
        setTotalPRs(prs.length);
        setMetrics(metricsData);
      })
      .catch(() => {
        if (!cancelled) {
          setError('Erro ao carregar dados.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const refresh = () => setTick((t) => t + 1);

  const statCards = React.useMemo(
    () => [
      {
        title: 'PRs Analisados',
        value: metrics?.totalPRsAnalyzed ?? totalPRs,
        change: 'Total analisado',
        icon: GitPullRequest,
        className: 'bg-gradient-to-br from-[#144F74] to-[#06314C]',
      },
      {
        title: 'Economia de Tempo',
        value: metrics?.timeSavedFormatted ?? '0h',
        change: `${metrics?.timeSavedHours ?? 0} horas economizadas`,
        icon: Clock,
      },
      {
        title: 'Usuários Ativos',
        value: metrics?.totalUsers ?? usuarios.length,
        change: `${usuarios.filter((u) => u.role === 'ADMIN').length} admins`,
        icon: Users,
      },
      {
        title: 'Chaves API Ativas',
        value: 1,
        change: 'Revisar em 60 dias',
        icon: Key,
      },
    ],
    [metrics, totalPRs, usuarios],
  );

  const invite = async (data: {
    nome: string;
    email: string;
    role: RoleUsuario;
    password?: string;
  }) => {
    await usersService.create({
      username: data.nome,
      email: data.email,
      password: data.password!,
      role: data.role,
    });

    refresh();
  };

  const update = async (
    id: number,
    data: {
      nome: string;
      email: string;
      role: RoleUsuario;
      password?: string;
    },
  ) => {
    await usersService.update(id, {
      username: data.nome,
      email: data.email,
      role: data.role,
      ...(data.password ? { password: data.password } : {}),
    });

    refresh();
  };

  const remove = async (id: number) => {
    await usersService.delete(id);
    refresh();
  };

  return {
    usuarios,
    loading,
    error,
    statCards,
    invite,
    update,
    remove,
  };
}
