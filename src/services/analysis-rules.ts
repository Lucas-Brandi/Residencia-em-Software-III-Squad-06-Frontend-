import { http } from '@/services/http'
import type { AnalysisRule, CreateAnalysisRuleDto, UpdateAnalysisRuleDto } from '@/types/analysis-rule'

export const analysisRulesService = {
  getAll:  ()                                          => http<AnalysisRule[]>('/analysis-rules'),
  getById: (id: string)                                => http<AnalysisRule>(`/analysis-rules/${id}`),
  create:  (dto: CreateAnalysisRuleDto)                => http<AnalysisRule>('/analysis-rules', { method: 'POST', body: JSON.stringify(dto) }),
  update:  (id: string, dto: UpdateAnalysisRuleDto)    => http<AnalysisRule>(`/analysis-rules/${id}`, { method: 'PATCH', body: JSON.stringify(dto) }),
  delete:  (id: string)                                => http<void>(`/analysis-rules/${id}`, { method: 'DELETE' }),
}