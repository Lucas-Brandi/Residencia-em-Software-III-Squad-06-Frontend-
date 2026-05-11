import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Regra, CategoriaRegra, Gravidade, StatusRegra } from '@/types/rules';

interface RuleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (regra: Omit<Regra, 'id'>) => void;
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

function RuleFormContent({
  editingRule,
  onSubmit,
  onClose,
}: {
  editingRule?: Regra;
  onSubmit: (regra: Omit<Regra, 'id'>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    titulo: editingRule?.titulo || '',
    categoria: editingRule?.categoria || ('Segurança' as CategoriaRegra),
    gravidade: editingRule?.gravidade || ('Aviso' as Gravidade),
    status: editingRule?.status || ('Ativo' as StatusRegra),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      title={editingRule ? 'Editar Regra' : 'Adicionar Nova Regra'}
      description={
        editingRule
          ? 'Edite as informações da regra existente.'
          : 'Preencha os dados para criar uma nova regra.'
      }
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
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
              setFormData((prev) => ({ ...prev, titulo: e.target.value }))
            }
            placeholder="Digite o título da regra"
            required
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
              setFormData((prev) => ({
                ...prev,
                categoria: e.target.value as CategoriaRegra,
              }))
            }
            className="w-full h-8 px-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
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
              setFormData((prev) => ({
                ...prev,
                gravidade: e.target.value as Gravidade,
              }))
            }
            className="w-full h-8 px-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
          >
            {gravidades.map((grav) => (
              <option key={grav} value={grav}>
                {grav}
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
              setFormData((prev) => ({
                ...prev,
                status: e.target.value as StatusRegra,
              }))
            }
            className="w-full h-8 px-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
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
