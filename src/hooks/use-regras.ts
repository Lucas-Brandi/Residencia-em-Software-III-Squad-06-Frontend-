import * as React from 'react';
import { analysisRulesService } from '@/services/analysis-rules';
import type { Regra } from '@/types/rules';

const REPOSITORY_ID = '2a446e40-8422-4471-91fd-7d0f9faa59a9';

interface RuleFormData {
  titulo: string;
  descricao: string;
  categoria: string;
  gravidade: string;
  status: string | boolean;
}

function getCurrentUserId(): number {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw).id : 1;
  } catch {
    return 1;
  }
}

function parseSeverityToBackend(
  gravidade?: string,
): 'INFO' | 'AVISO' | 'CRITICO' {
  const n = gravidade?.toLowerCase() ?? '';

  if (n.includes('dica') || n.includes('info')) return 'INFO';
  if (n.includes('crítico') || n.includes('critico')) return 'CRITICO';

  return 'AVISO';
}

function parseSeverityToFrontend(severity?: string): string {
  if (severity === 'CRITICO') return 'Crítico';
  if (severity === 'INFO') return 'Dica';

  return 'Aviso';
}

function toRegra(item: {
  id: string;
  content?: string;
  description?: string;
  ruleType?: string;
  severity?: string;
  isActive?: boolean;
}): Regra {
  return {
    id: item.id,
    titulo: item.content ?? 'Sem título',
    descricao: item.description ?? '',
    categoria: item.ruleType ?? 'Estilo',
    gravidade: parseSeverityToFrontend(item.severity),
    status: item.isActive !== false ? 'Ativo' : 'Inativo',
  };
}

function buildDto(rule: RuleFormData) {
  return {
    repositoryId: REPOSITORY_ID,
    ruleType: rule.categoria,
    content: rule.titulo,
    description: rule.descricao,
    severity: parseSeverityToBackend(rule.gravidade),
    isActive: rule.status === 'Ativo' || rule.status === true,
    createdById: getCurrentUserId(),
  };
}

export function useRegras() {
  const [regras, setRegras] = React.useState<Regra[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchRules = async () => {
    try {
      setLoading(true);

      const data = await analysisRulesService.getAll(REPOSITORY_ID);

      setRegras(data.map(toRegra));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    async function loadRules() {
      try {
        setLoading(true);

        const data = await analysisRulesService.getAll(REPOSITORY_ID);

        setRegras(data.map(toRegra));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    void loadRules();
  }, []);

  const create = (rule: RuleFormData) =>
    analysisRulesService.create(buildDto(rule)).then(fetchRules);

  const update = (id: string, rule: RuleFormData) =>
    analysisRulesService.update(id, buildDto(rule)).then(fetchRules);

  const remove = (id: string) =>
    analysisRulesService.delete(id).then(fetchRules);

  return { regras, loading, create, update, remove };
}
