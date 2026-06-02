import * as React from 'react';
import { useParams } from 'react-router-dom';
import { analysisResultsService } from '@/services/analysis-results';
import { pullRequestsService } from '@/services/pull-requests';
import { findingsService } from '@/services/findings';
import type { AnalysisResult } from '@/types/analysis-result';
import type { PullRequest } from '@/types/pull-request';
import type {
  Finding,
  FindingType,
  FindingCategory,
} from '@/types/pr-analysis';
import type { ApiFinding } from '@/services/findings';

function severityToType(severity: string): FindingType {
  if (severity === 'CRITICO') return 'critico';
  if (severity === 'INFO') return 'boa-pratica';
  return 'aviso';
}

function ruleTypeToCategory(ruleType?: string): FindingCategory {
  const r = ruleType?.toLowerCase() ?? '';
  if (r.includes('segur')) return 'seguranca';
  if (r.includes('estilo') || r.includes('docs') || r.includes('style'))
    return 'estilo-docs';
  if (r.includes('solid') || r.includes('logic') || r.includes('lógica'))
    return 'solid-logica';
  return 'todas';
}

function toFinding(item: ApiFinding): Finding {
  return {
    id: item.id as unknown as number,
    type: severityToType(item.severity),
    category: ruleTypeToCategory(item.rule?.ruleType),
    title: item.rule?.title ?? `Finding em ${item.filePath}:${item.lineNumber}`,
    description: item.description,
  };
}

interface UsePRAnalysisReturn {
  pr: PullRequest | null;
  analysis: AnalysisResult | null;
  findings: Finding[];
  loading: boolean;
  error: string | null;
}

export function usePRAnalysis(): UsePRAnalysisReturn {
  const { id } = useParams<{ id: string }>();

  const [pr, setPr] = React.useState<PullRequest | null>(null);
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const [findings, setFindings] = React.useState<Finding[]>([]);
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
      .then(async ([prData, analysisData]) => {
        setPr(prData);
        setAnalysis(analysisData);
        if (analysisData) {
          const raw = await findingsService.getAll({
            analysisResultId: analysisData.id,
          });
          setFindings(raw.map(toFinding));
        }
      })
      .catch(() => setError('Erro ao carregar análise'))
      .finally(() => setLoading(false));
  }, [id]);

  return { pr, analysis, findings, loading, error };
}
