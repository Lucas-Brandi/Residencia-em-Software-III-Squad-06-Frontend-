export interface AnalysisRule {
  id: string
  repositoryId: string
  ruleType: string
  content: string
  createdById: number
}

export interface CreateAnalysisRuleDto {
  repositoryId: string
  ruleType: string
  content: string
  createdById: number
}

export interface UpdateAnalysisRuleDto extends Partial<CreateAnalysisRuleDto> {}