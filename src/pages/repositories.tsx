import { useEffect, useMemo, useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreateRepositoryModal } from '@/components/modals/create-repository-modal';
import { CreateTeamModal } from '@/components/modals/create-team-modal';
import { repositoriesService } from '@/services/repositories';
import { teamsService } from '@/services/teams';
import type { Repository } from '@/types/repository';
import type { Team } from '@/types/team';
import { Plus, Trash2 } from 'lucide-react';

export default function Repositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [repos, teamList] = await Promise.all([
          repositoriesService.getAll(),
          teamsService.getAll(),
        ]);
        setRepositories(repos);
        setTeams(teamList);
      } catch (err) {
        console.error('Erro ao carregar repositórios ou equipes:', err);
        setError('Falha ao carregar dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      const message =
        err instanceof Error
          ? err.message
          : 'Erro ao criar equipe. Tente novamente.';
      setError(message);
      throw err;
    }
  };

  const handleCreateRepository = async (dto: {
    name: string;
    githubId: number;
    githubUrl?: string;
    teamId: string;
  }) => {
    try {
      const created = await repositoriesService.create(dto);
      setRepositories((prev) => [...prev, created]);
    } catch (err) {
      console.error('Erro ao criar repositório:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Erro ao criar repositório. Tente novamente.';
      setError(message);
      throw err;
    }
  };

  const repositoriesMemo = useMemo(() => repositories, [repositories]);

  return (
    <SidebarProvider>
      <AppSidebar activePath="/repositories" />
      <SidebarInset>
        <main className="p-8 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                Repositórios
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Cadastre repositórios e vincule-os a equipes. Crie uma equipe
                diretamente no formulário de cadastro ou acesse o gerenciamento
                completo de equipes.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={() => setIsRepoModalOpen(true)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                <Plus size={16} />
                Criar repositório
              </Button>
              <a
                href="/teams"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted/90"
              >
                Gerenciar equipes
              </a>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <Card>
            {loading ? (
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                Carregando repositórios...
              </div>
            ) : repositoriesMemo.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 p-12 text-center text-muted-foreground">
                <p className="text-base font-medium text-foreground">
                  Nenhum repositório cadastrado ainda.
                </p>
                <p>Use o botão acima para criar o primeiro repositório.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-slate-950/40 text-left text-sm uppercase tracking-wide text-muted-foreground">
                      <th className="px-6 py-4">Nome</th>
                      <th className="px-6 py-4">GitHub</th>
                      <th className="px-6 py-4">Equipe</th>
                      <th className="px-6 py-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {repositoriesMemo.map((repo) => (
                      <tr
                        key={repo.id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-foreground">
                          {repo.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {repo.githubUrl ? (
                            <a
                              href={repo.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary underline"
                            >
                              Ver no GitHub
                            </a>
                          ) : (
                            <span className="text-muted-foreground">
                              Sem URL
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {teams.find((team) => team.id === repo.teamId)
                            ?.name ?? '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          <Button variant="ghost" size="icon-xs">
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

      <CreateRepositoryModal
        isOpen={isRepoModalOpen}
        onClose={() => setIsRepoModalOpen(false)}
        teams={teams}
        onSubmit={handleCreateRepository}
        onCreateTeam={() => setIsTeamModalOpen(true)}
      />

      <CreateTeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSubmit={handleCreateTeam}
      />
    </SidebarProvider>
  );
}
