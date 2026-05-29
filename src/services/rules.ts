import { http } from '@/services/http';

export interface Rule {
  id: string;
  ruleType: string;
  content: string;
  severity: 'CRITICO' | 'AVISO' | 'INFO';
  isActive: boolean;
  repositories?: { id: string; name: string }[];
}

export interface CreateRuleDto {
  ruleType: string;
  content: string;
  severity: 'CRITICO' | 'AVISO' | 'INFO';
  isActive: boolean;
}

export interface AssignRuleDto {
  ruleId: string;
  repositoryIds: string[];
}

export const rulesService = {
  getAll: () => http<Rule[]>('/rules'),
  getById: (id: string) => http<Rule>(`/rules/${id}`),
  create: (dto: CreateRuleDto) =>
    http<Rule>('/rules', { method: 'POST', body: JSON.stringify(dto) }),
  update: (id: string, dto: Partial<CreateRuleDto>) =>
    http<Rule>(`/rules/${id}`, { method: 'PATCH', body: JSON.stringify(dto) }),
  delete: (id: string) => http<void>(`/rules/${id}`, { method: 'DELETE' }),
  assign: (dto: AssignRuleDto) =>
    http<void>('/rules/assign', { method: 'POST', body: JSON.stringify(dto) }),
  unassign: (ruleId: string, repositoryId: string) =>
    http<void>(`/rules/${ruleId}/repositories/${repositoryId}`, {
      method: 'DELETE',
    }),
};
