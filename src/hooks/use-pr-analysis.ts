import * as React from 'react';
import { useParams } from 'react-router-dom';
import { analysisResultsService } from '@/services/analysis-results';
import { pullRequestsService } from '@/services/pull-requests';
import type { AnalysisResult } from '@/types/analysis-result';
import type { PullRequest } from '@/types/pull-request';

interface UsePRAnalysisReturn {
  pr: PullRequest | null;
  analysis: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

export function usePRAnalysis(): UsePRAnalysisReturn {
  const { id } = useParams<{ id: string }>();

  const [pr, setPr] = React.useState<PullRequest | null>(null);
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;

    Promise.all([
      pullRequestsService.getById(id),
      analysisResultsService
        .getAll()
        .then((list) => list.find((a) => a.prId === id) ?? null),
    ])
      .then(([prData, analysisData]) => {
        setPr(prData);
        setAnalysis(analysisData);
      })
      .catch(() => setError('Erro ao carregar análise'))
      .finally(() => setLoading(false));
  }, [id]);

  return { pr, analysis, loading, error };
}
