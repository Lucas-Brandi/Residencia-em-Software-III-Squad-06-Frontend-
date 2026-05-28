import { http } from '@/services/http';
import type {
  AnalysisResult,
  CreateAnalysisResultDto,
  UpdateAnalysisResultDto,
} from '@/types/analysis-result';

export const analysisResultsService = {
  getAll: () => http<AnalysisResult[]>('/analysis-results'),
  getById: (id: string) => http<AnalysisResult>(`/analysis-results/${id}`),
  create: (dto: CreateAnalysisResultDto) =>
    http<AnalysisResult>('/analysis-results', {
      method: 'POST',
      body: JSON.stringify(dto),
    }),
  update: (id: string, dto: UpdateAnalysisResultDto) =>
    http<AnalysisResult>(`/analysis-results/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    }),
  delete: (id: string) =>
    http<void>(`/analysis-results/${id}`, { method: 'DELETE' }),
};
