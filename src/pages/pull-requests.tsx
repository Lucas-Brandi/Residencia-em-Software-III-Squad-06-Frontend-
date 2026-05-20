import * as React from 'react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRTable } from '@/components/ui/pr-table';
import { pullRequestsService } from '@/services/pull-requests';
import type { PullRequest } from '@/types/pull-request';

const PAGE_SIZES = [10, 25, 50, 100];

export default function PullRequests() {
  const [prs, setPrs] = React.useState<PullRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    pullRequestsService
      .getAll()
      .then(setPrs)
      .catch(() => setError('Erro ao carregar pull requests'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = prs.filter((pr) =>
    (pr.title ?? '').toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <SidebarProvider>
      <AppSidebar activePath="/prs" />

      <SidebarInset>
        <main className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Pull Requests
              </h1>
              <p className="text-sm text-muted-foreground">
                Veja todos os pull requests salvos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Input
              placeholder="Pesquisar por título"
              className="w-64"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <Card className="overflow-hidden">
            {loading && (
              <p className="text-sm text-muted-foreground p-6 text-center">
                Carregando...
              </p>
            )}
            {error && (
              <p className="text-sm text-red-400 p-6 text-center">{error}</p>
            )}
            {!loading && !error && <PRTable pullRequests={paginated} />}
          </Card>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-4">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="h-8 rounded-lg border border-input bg-background px-2.5 py-1 text-sm text-foreground outline-none"
              >
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s} linhas por página
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon-xs"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft size={14} strokeWidth={1.5} />
                </Button>
                <span className="px-3 py-1 text-sm text-muted-foreground">
                  Página {page} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon-xs"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight size={14} strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
