import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Repository, CreateRepositoryDto } from '@/types/repository';
import { teamsService } from '@/services/teams';
import type { Team } from '@/types/team';

// ... mesmas props, remove teamId daqui
interface RepositorioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dto: CreateRepositoryDto) => void;
  editingRepositorio?: Repository;
}

function RepositorioFormContent({
  editingRepositorio,
  onSubmit,
  onClose,
}: {
  editingRepositorio?: Repository;
  onSubmit: (dto: CreateRepositoryDto) => void;
  onClose: () => void;
}) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [formData, setFormData] = useState({
    name: editingRepositorio?.name ?? '',
    githubId: editingRepositorio?.githubId ?? ('' as number | ''),
    githubUrl: editingRepositorio?.githubUrl ?? '',
    teamId: editingRepositorio?.teamId ?? '',
  });

  useEffect(() => {
    teamsService.getAll().then(setTeams).catch(console.error);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.githubId === '' || !formData.teamId)
      return;
    onSubmit({
      name: formData.name.trim(),
      githubId: Number(formData.githubId),
      teamId: formData.teamId,
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
            htmlFor="teamId"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Time
          </label>
          <select
            id="teamId"
            value={formData.teamId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, teamId: e.target.value }))
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">Selecione um time</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
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
}: RepositorioFormModalProps) {
  if (!isOpen) return null;

  return (
    <RepositorioFormContent
      key={editingRepositorio?.id ?? 'new'}
      editingRepositorio={editingRepositorio}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}
