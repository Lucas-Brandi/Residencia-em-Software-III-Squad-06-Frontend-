import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Check,
  X,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PullRequest {
  id: string;
  title: string;
  author: string;
  status: 'Aprovado' | 'Reprovado' | 'Em análise' | 'Aprovado com alertas';
}

const mockPullRequests: PullRequest[] = [
  {
    id: '#024',
    title: 'Ajuste na autenticação de usuário',
    author: 'Olivia Silva',
    status: 'Em análise',
  },
  {
    id: '#023',
    title: 'Correção de bug de cores do Dashboard',
    author: 'Yuri Santos',
    status: 'Aprovado',
  },
  {
    id: '#022',
    title: 'Organização dos cards de métricas',
    author: 'Luiza Martins',
    status: 'Aprovado com alertas',
  },
  {
    id: '#021',
    title: 'Redesign do novo header',
    author: 'Lara Silveira',
    status: 'Aprovado',
  },
  {
    id: '#020',
    title: 'Organizando componentes',
    author: 'André Salgueiro',
    status: 'Reprovado',
  },
  {
    id: '#019',
    title: 'Biblioteca nova adicionada',
    author: 'Harry Tavares',
    status: 'Aprovado',
  },
  {
    id: '#018',
    title: 'Padronização de espaçamentos',
    author: 'Pedro Jackson',
    status: 'Em análise',
  },
  {
    id: '#017',
    title: 'Criação de componente de gráfico',
    author: 'Anna Beatriz C.',
    status: 'Aprovado',
  },
  {
    id: '#016',
    title: 'Criação dos cards de estatísticas de PR',
    author: 'Louise Rossi',
    status: 'Aprovado com alertas',
  },
  {
    id: '#015',
    title: 'Melhorias de responsividade',
    author: 'Taylor Fontes',
    status: 'Aprovado',
  },
  {
    id: '#014',
    title: 'Melhorias no tratamento de erros',
    author: 'Alita Alves',
    status: 'Reprovado',
  },
  {
    id: '#013',
    title: 'Atualizações de acordo com documentação',
    author: 'Gabriel Rocha',
    status: 'Aprovado',
  },
];

const statusConfig = {
  Aprovado: {
    icon: Check,
    label: 'Aprovado',
    className: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  Reprovado: {
    icon: X,
    label: 'Reprovado',
    className: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  'Em análise': {
    icon: Clock,
    label: 'Em análise',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  'Aprovado com alertas': {
    icon: AlertTriangle,
    label: 'Aprovado com alertas',
    className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
};

function StatusBadge({ status }: { status: PullRequest['status'] }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium ${config.className}`}
    >
      <Icon size={12} strokeWidth={2} />
      <span>{config.label}</span>
    </div>
  );
}

export default function PullRequests() {
  return (
    <SidebarProvider>
      <AppSidebar activePath="/prs" />

      <SidebarInset>
        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-foreground">
                Pull Requests
              </h1>
              <p className="text-sm text-muted-foreground">
                Veja todos os pull requests salvos
              </p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex items-center gap-4">
            <Input placeholder="Filtrar por data" className="w-64" />
          </div>

          {/* Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Autor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockPullRequests.map((pr) => (
                    <tr
                      key={pr.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        {pr.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {pr.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {pr.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={pr.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button variant="ghost" size="icon-xs">
                          <MoreHorizontal size={14} strokeWidth={1.5} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">0 de 100 linhas</div>
            <div className="flex items-center gap-4">
              <select className="h-8 rounded-lg border border-input bg-background px-2.5 py-1 text-sm text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 outline-none">
                <option value="10">10 linhas por página</option>
                <option value="25">25 linhas por página</option>
                <option value="50">50 linhas por página</option>
                <option value="100">100 linhas por página</option>
              </select>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon-xs">
                  <ChevronLeft size={14} strokeWidth={1.5} />
                </Button>
                <span className="px-3 py-1 text-sm text-muted-foreground">
                  Página 1 de 10
                </span>
                <Button variant="outline" size="icon-xs">
                  <ChevronRight size={14} strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
