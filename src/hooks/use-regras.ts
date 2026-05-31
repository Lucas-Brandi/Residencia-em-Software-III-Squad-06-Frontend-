import * as React from 'react';
import { rulesService } from '@/services/rules';
import type { Regra } from '@/types/rules';
import type { RuleFormData } from '@/components/modals/rule-form-modal';
import type { CreateRuleDto } from '@/services/rules';

function parseSeverityToBackend(
  gravidade: string,
): 'INFO' | 'AVISO' | 'CRITICO' {
  if (gravidade === 'Dica') return 'INFO';
  if (gravidade === 'Crítico') return 'CRITICO';
  return 'AVISO';
}

function parseSeverityToFrontend(severity: string): string {
  if (severity === 'CRITICO') return 'Crítico';
  if (severity === 'INFO') return 'Dica';
  return 'Aviso';
}

function toRegra(item: {
  id: string;
  title: string;
  description: string;
  content: string;
  ruleType: string;
  severity: string;
  isActive: boolean;
  repositories?: { repository: { id: string; name: string } }[];
}): Regra {
  return {
    id: item.id,
    titulo: item.title,
    descricao: item.description,
    categoria: item.ruleType as Regra['categoria'],
    gravidade: parseSeverityToFrontend(item.severity) as Regra['gravidade'],
    status: item.isActive ? 'Ativo' : 'Inativo',
    repositorio:
      item.repositories?.map((r) => r.repository.name).join(', ') || '—',
    repositoryIds: item.repositories?.map((r) => r.repository.id) ?? [], // 👈
  };
}

function toDto(r: Omit<Regra, 'id'>): CreateRuleDto {
  const dto = {
    title: r.titulo,
    description: r.descricao,
    content: r.descricao,
    ruleType: r.categoria,
    severity: parseSeverityToBackend(r.gravidade),
    isActive: r.status === 'Ativo',
  };
  console.log('dto enviado:', dto);
  return dto;
}

export function useRegras() {
  const [regras, setRegras] = React.useState<Regra[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchRules = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await rulesService.getAll();
      console.log('rules:', data);
      setRegras(data.map(toRegra));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const loadRules = async () => {
      try {
        setLoading(true);
        const data = await rulesService.getAll();
        setRegras(data.map(toRegra));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadRules();
  }, []);

  const create = async (r: RuleFormData) => {
    const created = await rulesService.create(toDto(r));
    if (r.repositoryIds.length > 0) {
      await rulesService.assign({
        ruleId: created.id,
        repositoryIds: r.repositoryIds,
      });
    }
    await fetchRules();
  };

  const update = async (id: string, r: RuleFormData) => {
    await rulesService.update(id, toDto(r));

    const regra = regras.find((g) => g.id === id);
    const antigos = regra?.repositoryIds ?? [];
    const novos = r.repositoryIds;
    const removidos = antigos.filter((rid) => !novos.includes(rid));
    for (const repositoryId of removidos) {
      await rulesService.unassign(id, repositoryId);
    }
    const adicionados = novos.filter((rid) => !antigos.includes(rid));
    if (adicionados.length > 0) {
      await rulesService.assign({ ruleId: id, repositoryIds: adicionados });
    }
    await fetchRules();
  };

  const remove = (id: string) => rulesService.delete(id).then(fetchRules);

  return { regras, loading, create, update, remove };
}
