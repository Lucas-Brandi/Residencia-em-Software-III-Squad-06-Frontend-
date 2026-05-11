import { http } from '@/services/http'
import type { PullRequest, CreatePullRequestDto, UpdatePullRequestDto } from '@/types/pull-request'

export const pullRequestsService = {
  getAll:  ()                                        => http<PullRequest[]>('/pull-requests'),
  getById: (id: string)                              => http<PullRequest>(`/pull-requests/${id}`),
  create:  (dto: CreatePullRequestDto)               => http<PullRequest>('/pull-requests', { method: 'POST', body: JSON.stringify(dto) }),
  update:  (id: string, dto: UpdatePullRequestDto)   => http<PullRequest>(`/pull-requests/${id}`, { method: 'PATCH', body: JSON.stringify(dto) }),
  delete:  (id: string)                              => http<void>(`/pull-requests/${id}`, { method: 'DELETE' }),
}