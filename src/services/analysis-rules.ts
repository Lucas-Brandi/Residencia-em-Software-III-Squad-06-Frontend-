import { http } from '@/services/http';

export interface AnalysisRule {
  id: string;
  repositoryId: string;
  ruleType: string;
  content: string;
  severity: 'INFO' | 'AVISO' | 'CRITICO';
  isActive: boolean;
  createdById: number;
}

export interface CreateAnalysisRuleDto {
  repositoryId: string;
  ruleType: string;
  content: string;
  severity: 'INFO' | 'AVISO' | 'CRITICO';
  isActive: boolean;
  createdById: number;
}

export const analysisRulesService = {
  getAll: (repositoryId: string) =>
    http<AnalysisRule[]>(`/analysis-rules?repositoryId=${repositoryId}`),
  create: (dto: CreateAnalysisRuleDto) =>
    http<AnalysisRule>('/analysis-rules', {
      method: 'POST',
      body: JSON.stringify(dto),
    }),
  update: (id: string, dto: Partial<CreateAnalysisRuleDto>) =>
    http<AnalysisRule>(`/analysis-rules/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    }),
  delete: (id: string) =>
    http<void>(`/analysis-rules/${id}`, { method: 'DELETE' }),
};
