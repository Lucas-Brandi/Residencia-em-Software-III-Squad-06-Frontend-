import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { FindingsFilter } from '@/components/ui/findings-filter';
import { PRTimeline } from '@/components/ui/pr-timeline';
import { PRAnalysisInfoCard } from '@/components/layout/pr-analysis-info-card';
import { usePRAnalysis } from '@/hooks/use-pr-analysis';
import { findings } from '@/mocks/pr-analysis';
import type { AnalysisResult } from '@/types/analysis-result';

function buildTimeline(analysis: AnalysisResult) {
  const toTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return [
    {
      id: 1,
      label: `PR #${analysis.pr.prNumber} aberto`,
      time: toTime(analysis.pr.openedAt),
    },
    {
      id: 2,
      label: 'Análise da IA Iniciada',
      time: toTime(analysis.createdAt),
    },
    { id: 3, label: 'Análise Concluída', time: toTime(analysis.createdAt) },
    { id: 4, label: `Status: ${analysis.status}`, time: '' },
  ];
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar activePath="" />
      <SidebarInset>
        <main className="p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function PRAnalysis() {
  const { pr, analysis, loading, error } = usePRAnalysis();

  if (loading)
    return (
      <PageShell>
        <p className="text-muted-foreground text-sm">Carregando...</p>
      </PageShell>
    );
  if (error)
    return (
      <PageShell>
        <p className="text-red-400 text-sm">{error}</p>
      </PageShell>
    );
  if (!pr)
    return (
      <PageShell>
        <p className="text-red-400 text-sm">PR não encontrado.</p>
      </PageShell>
    );

  const timeline = analysis ? buildTimeline(analysis) : [];

  return (
    <SidebarProvider>
      <AppSidebar activePath="" />
      <SidebarInset>
        <main className="min-h-screen p-8 space-y-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-foreground">
              Análise de Pull Requests: PR #{pr.prNumber} - {pr.title}
            </h1>
          </div>

          <PRAnalysisInfoCard pr={pr} analysis={analysis} />

          <div className="grid grid-cols-[1fr_280px] gap-6 items-start">
            <FindingsFilter findings={findings} />
            <PRTimeline
              events={timeline}
              githubUrl={pr.githubUrl ?? undefined}
              onReanalyze={() => alert('Re-analisando...')}
            />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
