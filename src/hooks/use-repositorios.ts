import * as React from 'react';
import { repositoriesService } from '@/services/repositories';
import type {
  Repository,
  CreateRepositoryDto,
  UpdateRepositoryDto,
} from '@/types/repository';

export function useRepositorios() {
  const [repositorios, setRepositorios] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(true);

  const refetch = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await repositoriesService.getAll('');
      setRepositorios(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    async function loadRepositorios() {
      try {
        setLoading(true);
        const data = await repositoriesService.getAll('');
        setRepositorios(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadRepositorios();
  }, []);

  const create = async (dto: CreateRepositoryDto) => {
    await repositoriesService.create(dto);
    await refetch();
  };

  const update = async (id: string, dto: UpdateRepositoryDto) => {
    await repositoriesService.update(id, dto);
    await refetch();
  };

  const remove = (id: string) => repositoriesService.delete(id).then(refetch);

  return { repositorios, loading, create, update, remove };
}
