import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RoleBadge } from '@/components/ui/role-badge';
import { StatusUsuarioBadge } from '@/components/ui/status-usuario-badge';
import { UsuarioAdmin } from '@/types/admin';

interface UsersTableProps {
  usuarios: UsuarioAdmin[];
}

export function UsersTable({ usuarios }: UsersTableProps) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Título
                  <div className="flex flex-col">
                    <ChevronUp className="h-3 w-3 text-muted-foreground" />
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Categoria
                  <div className="flex flex-col">
                    <ChevronUp className="h-3 w-3 text-muted-foreground" />
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Status
                  <div className="flex flex-col">
                    <ChevronUp className="h-3 w-3 text-muted-foreground" />
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Último Acesso
                  <div className="flex flex-col">
                    <ChevronUp className="h-3 w-3 text-muted-foreground" />
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                  {usuario.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {usuario.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RoleBadge role={usuario.role} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusUsuarioBadge status={usuario.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {usuario.ultimoAcesso}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon-xs">
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon-xs">
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
