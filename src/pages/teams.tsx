import { useEffect, useMemo, useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { CreateTeamModal } from '@/components/modals/create-team-modal';
import { teamsService } from '@/services/teams';
import type { Team } from '@/types/team';
import { Edit3, Plus, Trash2, UserPlus, UserMinus } from 'lucide-react';

function EditTeamModal({
  isOpen,
  team,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  team: Team | null;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string }) => Promise<void>;
}) {
  const [name, setName] = useState(team?.name ?? '');
  const [description, setDescription] = useState(team?.description ?? '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!team) return;

    const trimmed = name.trim();
    if (!trimmed) {
      setError('Informe um nome válido para a equipe.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: trimmed,
        description: description.trim() || undefined,
      });
      onClose();
    } catch (err) {
      console.error('Erro ao atualizar equipe:', err);
      setError('Falha ao atualizar equipe. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !team) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Editar equipe"
      description="Atualize o nome da equipe."
      footer={
        <>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white text-white bg-transparent hover:bg-white/10"
          >
            Fechar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            Salvar alterações
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="edit-team-name"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Nome da equipe
          </label>
          <Input
            id="edit-team-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome da equipe"
            required
          />
        </div>

        <div>
          <label
            htmlFor="edit-team-description"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Descrição da equipe
          </label>
          <textarea
            id="edit-team-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva a equipe (opcional)"
            rows={3}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-black placeholder-gray-400 focus:border-primary focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </Modal>
  );
}

function ManageTeamMembersModal({
  isOpen,
  team,
  onClose,
  onAddMember,
  onRemoveMember,
}: {
  isOpen: boolean;
  team: Team | null;
  onClose: () => void;
  onAddMember: (userId: number) => Promise<void>;
  onRemoveMember: (userId: number) => Promise<void>;
}) {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!team) return;

    const parsedId = Number(userId);
    if (!parsedId || parsedId <= 0) {
      setError('Informe um ID de usuário válido.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await onAddMember(parsedId);
      setUserId('');
    } catch (err) {
      console.error('Erro ao adicionar membro:', err);
      setError('Falha ao adicionar membro. Verifique o ID e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !team) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Gerenciar membros"
      description={`Equipe ${team.name}`}
      footer={
        <Button
          variant="outline"
          onClick={onClose}
          className="border-white text-white bg-transparent hover:bg-white/10"
        >
          Fechar
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Adicionar um membro à equipe usando o ID do usuário.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <div className="flex-1">
              <label
                htmlFor="member-user-id"
                className="block text-sm font-medium text-foreground mb-1"
              >
                ID do usuário
              </label>
              <Input
                id="member-user-id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Ex: 123"
                inputMode="numeric"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              <UserPlus size={16} />
              <span>Adicionar membro</span>
            </Button>
          </form>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              Membros atuais
            </h3>
            <span className="text-sm text-muted-foreground">
              {team.members?.length ?? 0} membro(s)
            </span>
          </div>
          {team.members && team.members.length > 0 ? (
            <div className="space-y-3">
              {team.members.map((member) => (
                <div
                  key={member.user.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {member.user.username}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ID {member.user.id}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemoveMember(member.user.id)}
                    className="inline-flex items-center gap-2"
                  >
                    <UserMinus size={16} />
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
              Nenhum membro cadastrado ainda.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedTeamForMembers, setSelectedTeamForMembers] =
    useState<Team | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const teamList = await teamsService.getAll();
      setTeams(teamList);
    } catch (err) {
      console.error('Erro ao carregar equipes:', err);
      setError('Falha ao carregar as equipes. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadTeams();
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const handleCreateTeam = async (data: {
    name: string;
    description?: string;
    leaderId?: number;
    initialMemberIds?: number[];
  }) => {
    try {
      const newTeam = await teamsService.create(data);
      setTeams((prev) => [...prev, newTeam]);
    } catch (err) {
      console.error('Erro ao criar equipe:', err);
      throw err;
    }
  };

  const handleUpdateTeam = async (data: {
    name: string;
    description?: string;
  }) => {
    if (!selectedTeam) return;

    try {
      const updated = await teamsService.update(selectedTeam.id, data);
      setTeams((prev) =>
        prev.map((team) => (team.id === updated.id ? updated : team)),
      );
    } catch (err) {
      console.error('Erro ao atualizar equipe:', err);
      throw err;
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    const confirm = window.confirm(
      'Tem certeza que deseja remover esta equipe? Essa ação não pode ser desfeita.',
    );
    if (!confirm) return;

    try {
      await teamsService.delete(teamId);
      setTeams((prev) => prev.filter((team) => team.id !== teamId));
    } catch (err) {
      console.error('Erro ao remover equipe:', err);
      setError('Não foi possível remover a equipe. Tente novamente.');
    }
  };

  const handleOpenEdit = (team: Team) => {
    setSelectedTeam(team);
    setIsEditModalOpen(true);
  };

  const handleOpenMembers = (team: Team) => {
    setSelectedTeamForMembers(team);
    setIsMembersModalOpen(true);
  };

  const handleAddMember = async (userId: number) => {
    if (!selectedTeamForMembers) return;
    await teamsService.addMember(selectedTeamForMembers.id, { userId });
    await loadTeams();
  };

  const handleRemoveMember = async (userId: number) => {
    if (!selectedTeamForMembers) return;
    await teamsService.removeMember(selectedTeamForMembers.id, userId);
    await loadTeams();
  };

  const teamsMemo = useMemo(() => teams, [teams]);

  return (
    <SidebarProvider>
      <AppSidebar activePath="/teams" />
      <SidebarInset>
        <main className="p-8 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                Equipes
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie equipes, adicione membros e acione todas as opções de
                time em um só lugar.
              </p>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus size={16} />
              Criar equipe
            </Button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <Card className="flex flex-col gap-6 p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-muted p-4">
                <h2 className="text-sm font-semibold text-foreground">
                  Criar equipe
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Abra o modal para cadastrar uma nova equipe que poderá ser
                  usada em repositórios.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted p-4">
                <h2 className="text-sm font-semibold text-foreground">
                  Editar equipe
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Renomeie uma equipe já cadastrada com um clique no botão de
                  edição.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted p-4">
                <h2 className="text-sm font-semibold text-foreground">
                  Gerenciar membros
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Adicione ou remova membros por ID para cada equipe cadastrada.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            {loading ? (
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                Carregando equipes...
              </div>
            ) : teamsMemo.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 p-12 text-center text-muted-foreground">
                <p className="text-base font-medium text-foreground">
                  Nenhuma equipe cadastrada ainda.
                </p>
                <p>
                  Crie uma nova equipe para ver as opções de gerenciamento
                  disponíveis.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-slate-950/40 text-left text-sm uppercase tracking-wide text-muted-foreground">
                      <th className="px-6 py-4">Nome</th>
                      <th className="px-6 py-4">Descrição</th>
                      <th className="px-6 py-4">Membros</th>
                      <th className="px-6 py-4">Repositórios</th>
                      <th className="px-6 py-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {teamsMemo.map((team) => (
                      <tr
                        key={team.id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-foreground">
                          <div className="font-medium">{team.name}</div>
                          {team.leader && (
                            <div className="text-xs text-muted-foreground">
                              Líder: {team.leader.username}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {team.description ?? '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {team.members?.length ?? 0}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {team.repositories?.length ?? 0}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground space-x-2">
                          <Button
                            size="icon-xs"
                            variant="secondary"
                            onClick={() => handleOpenEdit(team)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon-xs"
                            variant="secondary"
                            onClick={() => handleOpenMembers(team)}
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon-xs"
                            variant="destructive"
                            onClick={() => handleDeleteTeam(team.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </main>
      </SidebarInset>

      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTeam}
      />

      <EditTeamModal
        key={selectedTeam?.id ?? 'edit-team'}
        isOpen={isEditModalOpen}
        team={selectedTeam}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateTeam}
      />

      <ManageTeamMembersModal
        key={selectedTeamForMembers?.id ?? 'members-team'}
        isOpen={isMembersModalOpen}
        team={selectedTeamForMembers}
        onClose={() => setIsMembersModalOpen(false)}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />
    </SidebarProvider>
  );
}
