import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { PullRequest } from '@/types/pull-request';

const statusStyles: Record<string, string> = {
  aberto: 'text-blue-400',
  fechado: 'text-muted-foreground',
  mergeado: 'text-green-400',
};

interface RecentPRsProps {
  prs: PullRequest[];
}

export function RecentPRs({ prs }: RecentPRsProps) {
  const navigate = useNavigate();

  return (
    <Card className="border-border" style={{ backgroundColor: '#1A2731' }}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">
          PRs Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        {prs.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Nenhum pull request encontrado.
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {prs.map((pr) => (
              <li
                key={pr.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground min-w-[32px]">
                    #{pr.prNumber}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {pr.title ?? 'Sem título'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium ${statusStyles[pr.status] ?? ''}`}
                  >
                    {pr.status}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10"
                      >
                        <MoreHorizontal size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      style={{ backgroundColor: '#1A2731' }}
                      className="border-border"
                    >
                      <DropdownMenuItem
                        className="cursor-pointer text-sm"
                        onClick={() => navigate(`/pr/${pr.id}`)}
                      >
                        Ver PR #{pr.prNumber}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
