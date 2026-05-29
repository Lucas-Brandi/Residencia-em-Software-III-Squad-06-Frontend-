import * as React from 'react';
import { repositoriesService } from '@/services/repositories';
import type {
  Repository,
  CreateRepositoryDto,
  UpdateRepositoryDto,
} from '@/types/repository';
import { rulesService } from '@/services/rules';

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
      // use-repositorios.ts — no refetch/load:
      const data = await repositoriesService.getAll(teamId);
      console.log('repos:', data);
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

  const create = async (dto: CreateRepositoryDto, ruleIds: string[] = []) => {
    const created = await repositoriesService.create(dto);
    for (const ruleId of ruleIds) {
      await rulesService.assign({ ruleId, repositoryIds: [created.id] });
    }
    await refetch();
  };

  const update = async (
    id: string,
    dto: UpdateRepositoryDto,
    ruleIds: string[] = [],
  ) => {
    await repositoriesService.update(id, dto);
    for (const ruleId of ruleIds) {
      await rulesService.assign({ ruleId, repositoryIds: [id] });
    }
    await refetch();
  };

  const remove = (id: string) => repositoriesService.delete(id).then(refetch);

  return { repositorios, loading, create, update, remove };
}
