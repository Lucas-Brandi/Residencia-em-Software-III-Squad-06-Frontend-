export interface Repository {
  id: string;
  name: string;
  githubId: number;
  githubUrl: string | null;
  teamId: string;
}

export interface CreateRepositoryDto {
  name: string;
  githubId: number;
  teamId: string;
  githubUrl?: string;
}

export type UpdateRepositoryDto = Partial<CreateRepositoryDto>;
