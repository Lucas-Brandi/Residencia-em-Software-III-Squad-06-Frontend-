export type PRStatusApi = 'aberto' | 'fechado' | 'mergeado'

export interface PullRequest {
  id: string
  repositoryId: string
  prNumber: number
  authorId: number
  title: string | null
  githubUrl: string | null
  status: PRStatusApi
}

export interface CreatePullRequestDto {
  repositoryId: string
  prNumber: number
  authorId: number
  status: PRStatusApi
  title?: string
  githubUrl?: string
}

export interface UpdatePullRequestDto extends Partial<CreatePullRequestDto> {}