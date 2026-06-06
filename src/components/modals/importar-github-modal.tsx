import * as React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { teamsService } from '@/services/teams';
import type { Team } from '@/types/team';
import type { CreateRepositoryDto } from '@/types/repository';
import type { BulkCreateResult } from '@/services/repositories';

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  private: boolean;
}

interface ImportarGithubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (repositories: CreateRepositoryDto[]) => Promise<BulkCreateResult>;
}

type ModalStep = 'config' | 'importing' | 'result';

export function ImportarGithubModal({
  isOpen,
  onClose,
  onImport,
}: ImportarGithubModalProps) {
  if (!isOpen) return null;
  return (
    <ImportarGithubContent onClose={onClose} onImport={onImport} />
  );
}

function ImportarGithubContent({
  onClose,
  onImport,
}: Omit<ImportarGithubModalProps, 'isOpen'>) {
  const [step, setStep] = React.useState<ModalStep>('config');
  const [githubToken, setGithubToken] = React.useState('');
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = React.useState('');
  const [fetchError, setFetchError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<BulkCreateResult | null>(null);

  React.useEffect(() => {
    teamsService.getAll().then(setTeams).catch(console.error);
  }, []);

  const selectClass =
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring';

  const handleImport = async () => {
    setFetchError(null);

    if (!githubToken.trim()) {
      setFetchError('Informe um token do GitHub.');
      return;
    }
    if (!selectedTeamId) {
      setFetchError('Selecione um time.');
      return;
    }

    setStep('importing');

    try {
      // Fetch all pages from GitHub API
      const allRepos: GithubRepo[] = [];
      let page = 1;
      const perPage = 100;

      while (true) {
        const res = await fetch(
          `https://api.github.com/user/repos?per_page=${perPage}&page=${page}&type=all`,
          {
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github+json',
            },
          },
        );

        if (!res.ok) {
          const msg =
            res.status === 401
              ? 'Token inválido ou sem permissão.'
              : `Erro ao buscar repositórios GitHub (${res.status}).`;
          setFetchError(msg);
          setStep('config');
          return;
        }

        const pageRepos: GithubRepo[] = await res.json();
        allRepos.push(...pageRepos);

        if (pageRepos.length < perPage) break;
        page++;
      }

      if (allRepos.length === 0) {
        setFetchError('Nenhum repositório encontrado na conta GitHub.');
        setStep('config');
        return;
      }

      const dtos: CreateRepositoryDto[] = allRepos.map((r) => ({
        name: r.name,
        githubId: r.id,
        githubUrl: r.html_url,
        teamId: selectedTeamId,
      }));

      const importResult = await onImport(dtos);
      setResult(importResult);
      setStep('result');
    } catch (err) {
      console.error(err);
      setFetchError('Erro inesperado ao importar repositórios.');
      setStep('config');
    }
  };

  const handleClose = () => {
    setStep('config');
    setGithubToken('');
    setSelectedTeamId('');
    setFetchError(null);
    setResult(null);
    onClose();
  };

  // --- Config step ---
  if (step === 'config') {
    return (
      <Modal
        isOpen
        onClose={handleClose}
        title="Importar todos do GitHub"
        description="Informe seu token do GitHub para buscar e importar todos os repositórios da sua conta."
        footer={
          <>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleImport}>Importar</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="github-token"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Token de acesso pessoal do GitHub
            </label>
            <input
              id="github-token"
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_..."
              className={selectClass}
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Necessita da permissão <code>repo</code> (ou{' '}
              <code>public_repo</code> para repositórios públicos).
            </p>
          </div>

          <div>
            <label
              htmlFor="import-team"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Vincular ao time
            </label>
            <select
              id="import-team"
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className={selectClass}
            >
              <option value="">Selecione um time</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {fetchError && (
            <p className="text-sm text-red-400">{fetchError}</p>
          )}
        </div>
      </Modal>
    );
  }

  // --- Importing step ---
  if (step === 'importing') {
    return (
      <Modal
        isOpen
        onClose={() => {}}
        title="Importando repositórios..."
        description="Aguarde enquanto buscamos e importamos seus repositórios do GitHub."
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">
            Isso pode levar alguns instantes.
          </p>
        </div>
      </Modal>
    );
  }

  // --- Result step ---
  return (
    <Modal
      isOpen
      onClose={handleClose}
      title="Importação concluída"
      description="Veja abaixo o resultado da importação dos repositórios."
      footer={
        <Button onClick={handleClose}>Fechar</Button>
      }
    >
      <div className="space-y-4">
        {/* Success summary */}
        <div className="flex items-center gap-3 rounded-md bg-green-500/10 border border-green-500/30 px-4 py-3">
          <span className="text-green-400 text-lg">✓</span>
          <p className="text-sm text-green-400 font-medium">
            {result?.created.length ?? 0} repositório(s) importado(s) com
            sucesso.
          </p>
        </div>

        {/* Failures */}
        {result && result.failed.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              {result.failed.length} falha(s):
            </p>
            <div className="max-h-52 overflow-y-auto space-y-1 rounded-md border border-border p-2">
              {result.failed.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded px-2 py-1.5 bg-destructive/10"
                >
                  <span className="text-destructive text-xs mt-0.5">✗</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {f.item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {f.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {result && result.failed.length === 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Nenhuma falha registrada.
          </p>
        )}
      </div>
    </Modal>
  );
}
