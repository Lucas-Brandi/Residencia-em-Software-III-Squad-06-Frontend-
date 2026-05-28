import * as React from 'react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { FindingsFilter } from '@/components/ui/findings-filter';
import { PRTimeline } from '@/components/ui/pr-timeline';
import { PRAnalysisInfoCard } from '@/components/layout/pr-analysis-info-card';
import { Button } from '@/components/ui/button';
import { usePRAnalysis } from '@/hooks/use-pr-analysis';
import { analysisResultsService } from '@/services/analysis-results';
import { findings } from '@/mocks/pr-analysis';
import type { AnalysisResult } from '@/types/analysis-result';
import { pullRequestsService } from '@/services/pull-requests';
import { Check, X } from 'lucide-react';

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
  const [reviewing, setReviewing] = React.useState(false);
  const [reviewStatus, setReviewStatus] = React.useState<
    'aprovado' | 'rejeitado' | null
  >(null);

  const handleReview = async (status: 'aprovado' | 'rejeitado') => {
    if (!analysis) return;
    setReviewing(true);
    try {
      const raw = localStorage.getItem('user');
      const reviewedById = raw ? JSON.parse(raw).id : null;

      await Promise.all([
        analysisResultsService.update(analysis.id, { status, reviewedById }),
        pullRequestsService.update(pr.id, {
          status: status === 'aprovado' ? 'mergeado' : 'fechado',
        }),
      ]);

      setReviewStatus(status);
    } catch {
      alert('Erro ao atualizar status.');
    } finally {
      setReviewing(false);
    }
  };

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
  const currentStatus = reviewStatus ?? analysis?.status;

  return (
    <SidebarProvider>
      <AppSidebar activePath="" />
      <SidebarInset>
        <main className="min-h-screen p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-foreground">
                Análise de Pull Requests: PR #{pr.prNumber} - {pr.title}
              </h1>
            </div>

            {analysis && currentStatus === 'pendente' && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleReview('rejeitado')}
                  disabled={reviewing}
                  variant="outline"
                  className="gap-2 border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-400"
                >
                  <X size={14} />
                  Reprovar
                </Button>
                <Button
                  onClick={() => handleReview('aprovado')}
                  disabled={reviewing}
                  className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check size={14} />
                  Aprovar
                </Button>
              </div>
            )}

            {currentStatus === 'aprovado' && (
              <span className="text-sm font-medium text-green-400">
                ✓ PR Aprovado
              </span>
            )}
            {currentStatus === 'rejeitado' && (
              <span className="text-sm font-medium text-red-400">
                ✗ PR Reprovado
              </span>
            )}
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
