export type AnalysisStatus = 'pendente' | 'aprovado' | 'rejeitado' 

export interface CreateAnalysisResultDto {
  prId: string
  healthScore: number  // 0-100
  iaFeedback: string
  status: AnalysisStatus
}

export interface UpdateAnalysisResultDto extends Partial<CreateAnalysisResultDto> {}