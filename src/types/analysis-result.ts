export type AnalysisStatus = 'pendente' | 'aprovado' | 'rejeitado';

export interface AnalysisResult {
  id: string;
  prId: string;
  healthScore: number;
  iaFeedback: string;
  status: AnalysisStatus;
  reviewedById: number | null;
  reviewedAt: string | null;
  createdAt: string;
  pr: {
    id: string;
    prNumber: number;
    title: string | null;
    githubUrl: string | null;
    status: string;
    openedAt: string;
    closedAt: string | null;
  };
  reviewedBy: null;
}

export interface CreateAnalysisResultDto {
  prId: string;
  healthScore: number;
  iaFeedback: string;
  status: AnalysisStatus;
}

export interface UpdateAnalysisResultDto {
  status?: AnalysisStatus;
  reviewedById?: number;
}
