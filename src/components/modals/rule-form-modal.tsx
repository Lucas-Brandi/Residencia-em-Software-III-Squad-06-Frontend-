import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type {
  Regra,
  CategoriaRegra,
  Gravidade,
  StatusRegra,
} from '@/types/rules';
import { http } from '@/services/http';
import type { Repository } from '@/types/repository';

export interface RuleFormData extends Omit<Regra, 'id'> {
  repositoryIds: string[];
}

interface RuleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RuleFormData) => void;
  editingRule?: Regra;
}

const categorias: CategoriaRegra[] = [
  'Segurança',
  'Lógica',
  'Estilo',
  'Performance',
  'Qualidade',
  'Arquitetura',
  'Frontend',
];
const gravidades: Gravidade[] = ['Crítico', 'Aviso', 'Dica'];
const statusOptions: StatusRegra[] = ['Ativo', 'Inativo'];
const selectClass =
  'w-full h-8 px-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring';

function RuleFormContent({
  editingRule,
  onSubmit,
  onClose,
}: {
  editingRule?: Regra;
  onSubmit: (data: RuleFormData) => void;
  onClose: () => void;
}) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [formData, setFormData] = useState({
    titulo: editingRule?.titulo || '',
    descricao: editingRule?.descricao || '',
    categoria: editingRule?.categoria || ('Segurança' as CategoriaRegra),
    gravidade: editingRule?.gravidade || ('Aviso' as Gravidade),
    status: editingRule?.status || ('Ativo' as StatusRegra),
    repositoryIds: [] as string[],
  });

  useEffect(() => {
    http<Repository[]>('/repositories')
      .then(setRepositories)
      .catch(console.error);
  }, []);

  const toggleRepo = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      repositoryIds: prev.repositoryIds.includes(id)
        ? prev.repositoryIds.filter((r) => r !== id)
        : [...prev.repositoryIds, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo.trim()) return;
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={editingRule ? 'Editar Regra' : 'Adicionar Nova Regra'}
      description={
        editingRule
          ? 'Edite as informações da regra.'
          : 'Preencha os dados para criar uma nova regra.'
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {editingRule ? 'Salvar alterações' : 'Criar'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Título
          </label>
          <Input
            id="titulo"
            value={formData.titulo}
            onChange={(e) =>
              setFormData((p) => ({ ...p, titulo: e.target.value }))
            }
            placeholder="Digite o título da regra"
            required
          />
        </div>

        <div>
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Descrição
          </label>
          <textarea
            id="descricao"
            value={formData.descricao}
            onChange={(e) =>
              setFormData((p) => ({ ...p, descricao: e.target.value }))
            }
            placeholder="Descreva o objetivo desta regra"
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Categoria
          </label>
          <select
            id="categoria"
            value={formData.categoria}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                categoria: e.target.value as CategoriaRegra,
              }))
            }
            className={selectClass}
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="gravidade"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Gravidade
          </label>
          <select
            id="gravidade"
            value={formData.gravidade}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                gravidade: e.target.value as Gravidade,
              }))
            }
            className={selectClass}
          >
            {gravidades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                status: e.target.value as StatusRegra,
              }))
            }
            className={selectClass}
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Repositórios{' '}
            <span className="text-muted-foreground font-normal">
              (opcional)
            </span>
          </label>
          {repositories.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Carregando repositórios...
            </p>
          ) : (
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto border border-border rounded-lg p-2">
              {repositories.map((repo) => (
                <label
                  key={repo.id}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.repositoryIds.includes(repo.id)}
                    onChange={() => toggleRepo(repo.id)}
                    className="rounded border-border"
                  />
                  {repo.name}
                </label>
              ))}
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
}

export function RuleFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingRule,
}: RuleFormModalProps) {
  if (!isOpen) return null;
  return (
    <RuleFormContent
      key={editingRule?.id || 'new'}
      editingRule={editingRule}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}
