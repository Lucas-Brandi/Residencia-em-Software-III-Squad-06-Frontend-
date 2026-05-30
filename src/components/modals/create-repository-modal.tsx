import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Team } from '@/types/team';
import type { CreateRepositoryDto } from '@/types/repository';

interface CreateRepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  onSubmit: (dto: CreateRepositoryDto) => Promise<void> | void;
  onCreateTeam?: () => void;
}

export function CreateRepositoryModal({
  isOpen,
  onClose,
  teams,
  onSubmit,
  onCreateTeam,
}: CreateRepositoryModalProps) {
  const defaultTeamId = teams[0]?.id ?? '';
  const [formData, setFormData] = useState({
    name: '',
    githubId: '',
    githubUrl: '',
    teamId: defaultTeamId,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const githubId = Number(formData.githubId);
    const teamId = formData.teamId;

    if (!name) {
      setError('Nome do repositório é obrigatório.');
      return;
    }

    if (!teamId) {
      setError('Selecione uma equipe para o repositório.');
      return;
    }

    if (!githubId || Number.isNaN(githubId)) {
      setError('ID do GitHub deve ser um número válido.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit({
        name,
        githubId,
        githubUrl: formData.githubUrl.trim() || undefined,
        teamId,
      });
      setFormData({
        name: '',
        githubId: '',
        githubUrl: '',
        teamId: teams[0]?.id ?? '',
      });
      onClose();
    } catch (err) {
      setError(
        'Erro ao criar repositório. Verifique os dados e tente novamente.',
      );
      console.error('Erro no modal de criar repositório:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError('');
    setFormData({
      name: '',
      githubId: '',
      githubUrl: '',
      teamId: teams[0]?.id ?? '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      title="Criar repositório"
      description="Cadastre um repositório e vincule-o a uma equipe existente."
      footer={
        <>
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-white text-white bg-transparent hover:bg-white/10"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="text-white hover:bg-[#0c2838] active:bg-[#091f2e] transition-colors"
            style={{ backgroundColor: '#0B2437' }}
          >
            {isSubmitting ? 'Criando...' : 'Criar repositório'}
          </Button>
        </>
      }
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="repo-name"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Nome do repositório
          </label>
          <Input
            id="repo-name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Digite o nome do repositório"
            required
            className="bg-white text-black border-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="github-id"
            className="block text-sm font-medium text-foreground mb-1"
          >
            ID do GitHub
          </label>
          <Input
            id="github-id"
            type="number"
            value={formData.githubId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, githubId: e.target.value }))
            }
            placeholder="Digite o ID do repositório no GitHub"
            required
            className="bg-white text-black border-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="github-url"
            className="block text-sm font-medium text-foreground mb-1"
          >
            URL do GitHub
          </label>
          <Input
            id="github-url"
            value={formData.githubUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))
            }
            placeholder="https://github.com/usuario/repositorio"
            className="bg-white text-black border-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="team-id"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Equipe
          </label>
          <div className="flex gap-2">
            <select
              id="team-id"
              value={formData.teamId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, teamId: e.target.value }))
              }
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
            >
              <option value="">Selecione uma equipe</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="secondary"
              onClick={onCreateTeam}
              className="min-w-[170px]"
            >
              + Criar equipe/time
            </Button>
          </div>
        </div>

        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Se não existir uma equipe, crie uma nova equipe antes de cadastrar o
            repositório.
          </p>
        )}
      </form>
    </Modal>
  );
}
