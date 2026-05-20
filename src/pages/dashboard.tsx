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
import { pullRequestsService } from '@/services/pull-requests';
import { buildStatCards } from '@/services/dashboard';
import type { PullRequest } from '@/types/pull-request';
import type { DateRange } from 'react-day-picker';

function getDefaultDateRange(): DateRange {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 6);
  return { from, to };
}

function filterByDateRange(
  prs: PullRequest[],
  dateRange?: DateRange,
): PullRequest[] {
  if (!dateRange?.from) return prs;
  const from = dateRange.from;
  const to = dateRange.to ?? dateRange.from;
  return prs.filter((pr) => {
    const opened = new Date(pr.openedAt);
    return opened >= from && opened <= to;
  });
}

export default function Dashboard() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    getDefaultDateRange,
  );
  const [prs, setPrs] = React.useState<PullRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    pullRequestsService
      .getAll()
      .then(setPrs)
      .catch(() => setError('Erro ao carregar pull requests'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = React.useMemo(
    () => filterByDateRange(prs, dateRange),
    [prs, dateRange],
  );
  const statCards = React.useMemo(() => buildStatCards(filtered), [filtered]);

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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statCards.map((card) => (
              <StatCard key={card.title} {...card} />
            ))}
          </div>

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
          {!loading && !error && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <PrChart prs={filtered} dateRange={dateRange} />
              <RecentPRs prs={filtered} />
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
