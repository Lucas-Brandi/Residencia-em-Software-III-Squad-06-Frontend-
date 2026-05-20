import * as React from 'react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { StatCard } from '@/components/ui/stat-card';
import { PrChart } from '@/components/ui/pr-chart';
import { RecentPRs } from '@/components/layout/recent-prs';
import { DateRangePicker } from '@/components/layout/date-range-picker';
import { statCards } from '@/mocks/dashboard';
import { pullRequestsService } from '@/services/pull-requests';
import type { PullRequest } from '@/types/pull-request';
import type { DateRange } from 'react-day-picker';

export default function Dashboard() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 0, 20),
    to: new Date(2026, 1, 9),
  });

  const [prs, setPrs] = React.useState<PullRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const filtered = prs.filter((pr) => {
    if (!dateRange?.from) return true;
    const opened = new Date(pr.openedAt);
    const from = dateRange.from;
    const to = dateRange.to ?? dateRange.from;
    return opened >= from && opened <= to;
  });

  React.useEffect(() => {
    pullRequestsService
      .getAll()
      .then(setPrs)
      .catch(() => setError('Erro ao carregar pull requests'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar activePath="/dashboard" />

      <SidebarInset>
        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            </div>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>

          {/* Stat Cards — mock até ter endpoint de métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statCards.map((card) => (
              <StatCard key={card.title} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Gráfico — mock até ter filtro de data */}
            <PrChart dateRange={dateRange} />

            {/* PRs Recentes — dados reais */}
            {loading && (
              <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                Carregando...
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center h-40 text-red-400 text-sm">
                {error}
              </div>
            )}
            {!loading && !error && <RecentPRs prs={filtered} />}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
