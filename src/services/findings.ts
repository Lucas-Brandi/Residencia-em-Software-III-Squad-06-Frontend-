import { http } from '@/services/http';

export interface ApiFinding {
  id: string;
  analysisResultId: string;
  ruleId: string;
  severity: 'CRITICO' | 'AVISO' | 'INFO';
  description: string;
  filePath: string;
  lineNumber: number;
  createdAt: string;
  rule?: {
    id: string;
    title: string;
    severity: string;
    ruleType: string;
  };
}

export const findingsService = {
  getAll: (params?: {
    analysisResultId?: string;
    severity?: string;
    ruleId?: string;
  }) => {
    const query = new URLSearchParams();
    if (params?.analysisResultId)
      query.set('analysisResultId', params.analysisResultId);
    if (params?.severity) query.set('severity', params.severity);
    if (params?.ruleId) query.set('ruleId', params.ruleId);
    return http<ApiFinding[]>(`/findings?${query.toString()}`);
  },
  getById: (id: string) => http<ApiFinding>(`/findings/${id}`),
};
