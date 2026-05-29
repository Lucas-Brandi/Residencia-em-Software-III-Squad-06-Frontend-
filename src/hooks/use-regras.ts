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
  content: string;
  ruleType: string;
  severity: string;
  isActive: boolean;
  repositories?: { repository: { id: string; name: string } }[];
}): Regra {
  return {
    id: item.id,
    titulo: item.content,
    descricao: '',
    categoria: item.ruleType as Regra['categoria'],
    gravidade: parseSeverityToFrontend(item.severity) as Regra['gravidade'],
    status: item.isActive ? 'Ativo' : 'Inativo',
    repositorio:
      item.repositories?.map((r) => r.repository.name).join(', ') || '—',
  };
}

function toDto(r: Omit<Regra, 'id'>): CreateRuleDto {
  return {
    ruleType: r.categoria,
    content: r.titulo,
    severity: parseSeverityToBackend(r.gravidade),
    isActive: r.status === 'Ativo',
  };
}

export function useRegras() {
  const [regras, setRegras] = React.useState<Regra[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchRules = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await rulesService.getAll();
      console.log('rules:', data); // 👈 verificar shape do retorno
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
    if (r.repositoryIds.length > 0) {
      await rulesService.assign({
        ruleId: id,
        repositoryIds: r.repositoryIds,
      });
    }
    await fetchRules();
  };

  const remove = (id: string) => rulesService.delete(id).then(fetchRules);

  return { regras, loading, create, update, remove };
}
