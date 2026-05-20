export type PRStatusApi = 'aberto' | 'fechado' | 'mergeado';

export interface PullRequest {
  id: string;
  repositoryId: string;
  prNumber: number;
  authorId: number;
  title: string | null;
  githubUrl: string | null;
  status: PRStatusApi;
  openedAt: string;
  closedAt: string | null;
  repository?: {
    id: string;
    name: string;
    githubId: number;
    githubUrl: string | null;
    teamId: string;
    isActive: boolean;
    createdAt: string;
  };
  author?: {
    id: number;
    username: string;
    githubUsername: string;
    avatarUrl: string;
    role: string;
  };
}

export interface CreatePullRequestDto {
  repositoryId: string;
  prNumber: number;
  authorId: number;
  status: PRStatusApi;
  title?: string;
  githubUrl?: string;
}

export type UpdatePullRequestDto = Partial<CreatePullRequestDto>;
