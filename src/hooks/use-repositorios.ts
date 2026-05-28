import * as React from 'react';
import { repositoriesService } from '@/services/repositories';
import type {
  Repository,
  CreateRepositoryDto,
  UpdateRepositoryDto,
} from '@/types/repository';

function getCurrentTeamId(): string {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw).teamId : '';
  } catch {
    return '';
  }
}

export function useRepositorios() {
  const [repositorios, setRepositorios] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(true);

  const teamId = getCurrentTeamId();

  const refetch = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await repositoriesService.getAll(teamId);
      setRepositorios(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  React.useEffect(() => {
    async function loadRepositorios() {
      try {
        setLoading(true);
        const data = await repositoriesService.getAll(teamId);
        setRepositorios(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadRepositorios();
  }, [teamId]);

  const create = (dto: CreateRepositoryDto) =>
    repositoriesService.create(dto).then(refetch);

  const update = (id: string, dto: UpdateRepositoryDto) =>
    repositoriesService.update(id, dto).then(refetch);

  const remove = (id: string) => repositoriesService.delete(id).then(refetch);

  return { repositorios, loading, create, update, remove };
}
