import { Github, Calendar, Gauge } from 'lucide-react';
import type { PullRequest } from '@/types/pull-request';
import type { AnalysisResult } from '@/types/analysis-result';

interface PRAnalysisInfoCardProps {
  pr: PullRequest;
  analysis: AnalysisResult | null;
}

export function PRAnalysisInfoCard({ pr, analysis }: PRAnalysisInfoCardProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Grid: 2 cols em mobile, 4 cols em md+ */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border"
        style={{ backgroundColor: '#39505B' }}
      >
        <InfoCell label="Repositório">
          <Github size={15} className="text-muted-foreground" />
          {pr.repository?.name ?? '—'}
        </InfoCell>

        <InfoCell label="Autor do PR">
          <img
            src={pr.author?.avatarUrl ?? ''}
            alt={pr.author?.username}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {pr.author?.username ?? '—'}
        </InfoCell>

        <InfoCell label="Enviado em">
          <Calendar size={15} className="text-muted-foreground shrink-0" />
          <span className="truncate">
            {new Date(pr.openedAt).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </InfoCell>

        <InfoCell label="Score">
          {analysis ? (
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: '#1a3d2b',
                color: '#4ade80',
                border: '1px solid #166534',
              }}
            >
              <Gauge size={15} />
              {analysis.healthScore}/100
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </InfoCell>
      </div>

      <div className="p-4 md:p-5" style={{ backgroundColor: '#1A2731' }}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {analysis?.iaFeedback ?? 'Nenhuma análise disponível para este PR.'}
        </p>
      </div>
    </div>
  );
}

function InfoCell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-4 md:p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2 text-sm text-foreground font-medium max-w-full">
        {children}
      </div>
    </div>
  );
}
