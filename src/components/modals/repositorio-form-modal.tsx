import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Repository, CreateRepositoryDto } from '@/types/repository';

interface RepositorioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dto: CreateRepositoryDto) => void;
  editingRepositorio?: Repository;
  teamId: string;
}

function RepositorioFormContent({
  editingRepositorio,
  onSubmit,
  onClose,
  teamId,
}: {
  editingRepositorio?: Repository;
  onSubmit: (dto: CreateRepositoryDto) => void;
  onClose: () => void;
  teamId: string;
}) {
  const [formData, setFormData] = useState({
    name: editingRepositorio?.name ?? '',
    githubId: editingRepositorio?.githubId ?? ('' as number | ''),
    githubUrl: editingRepositorio?.githubUrl ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.githubId === '') return;
    onSubmit({
      name: formData.name.trim(),
      githubId: Number(formData.githubId),
      teamId,
      githubUrl: formData.githubUrl.trim() || undefined,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={
        editingRepositorio ? 'Editar Repositório' : 'Adicionar Repositório'
      }
      description={
        editingRepositorio
          ? 'Edite as informações do repositório.'
          : 'Preencha os dados para adicionar um novo repositório.'
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {editingRepositorio ? 'Salvar alterações' : 'Criar'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Nome
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="ex: backend-api"
            required
          />
        </div>

        <div>
          <label
            htmlFor="githubId"
            className="block text-sm font-medium text-foreground mb-1"
          >
            GitHub ID
          </label>
          <Input
            id="githubId"
            type="number"
            value={formData.githubId}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                githubId: e.target.value === '' ? '' : Number(e.target.value),
              }))
            }
            placeholder="ex: 123456789"
            required
          />
        </div>

        <div>
          <label
            htmlFor="githubUrl"
            className="block text-sm font-medium text-foreground mb-1"
          >
            URL do repositório{' '}
            <span className="text-muted-foreground font-normal">
              (opcional)
            </span>
          </label>
          <Input
            id="githubUrl"
            value={formData.githubUrl ?? ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))
            }
            placeholder="https://github.com/org/repositorio"
          />
        </div>
      </form>
    </Modal>
  );
}

export function RepositorioFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingRepositorio,
  teamId,
}: RepositorioFormModalProps) {
  if (!isOpen) return null;

  return (
    <RepositorioFormContent
      key={editingRepositorio?.id ?? 'new'}
      editingRepositorio={editingRepositorio}
      onSubmit={onSubmit}
      onClose={onClose}
      teamId={teamId}
    />
  );
}
