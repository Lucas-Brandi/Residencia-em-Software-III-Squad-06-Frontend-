import * as React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { teamsService } from '@/services/teams';
import type { Repository } from '@/types/repository';
import type { Team } from '@/types/team';

interface RepositoriosTableProps {
  repositorios: Repository[];
  onEdit?: (repositorio: Repository) => void;
  onDelete?: (repositorioId: string) => void;
}

export function RepositoriosTable({
  repositorios,
  onEdit,
  onDelete,
}: RepositoriosTableProps) {
  const [teamsMap, setTeamsMap] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    teamsService
      .getAll()
      .then((teams: Team[]) => {
        const map = Object.fromEntries(teams.map((t) => [t.id, t.name]));
        setTeamsMap(map);
      })
      .catch(console.error);
  }, []);

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Regras vinculadas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {repositorios.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  Nenhum repositório encontrado.
                </td>
              </tr>
            )}
            {repositorios.map((repo) => (
              <tr key={repo.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                  {repo.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {repo.githubUrl ? (
                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {repo.githubUrl}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {teamsMap[repo.teamId] ?? (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  Em breve
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onEdit?.(repo)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onDelete?.(repo.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
