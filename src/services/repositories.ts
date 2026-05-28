import { http } from '@/services/http';
import type {
  Repository,
  CreateRepositoryDto,
  UpdateRepositoryDto,
} from '@/types/repository';

export const repositoriesService = {
  getAll: (teamId: string) =>
    http<Repository[]>(`/repositories?teamId=${teamId}`),

  getById: (id: string) => http<Repository>(`/repositories/${id}`),

  create: (dto: CreateRepositoryDto) =>
    http<Repository>('/repositories', {
      method: 'POST',
      body: JSON.stringify(dto),
    }),

  update: (id: string, dto: UpdateRepositoryDto) =>
    http<Repository>(`/repositories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    }),

  delete: (id: string) =>
    http<void>(`/repositories/${id}`, { method: 'DELETE' }),
};
