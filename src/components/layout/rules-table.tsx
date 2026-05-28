import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GravidadeBadge } from '@/components/ui/gravidade-badge';
import { StatusRegraBadge } from '@/components/ui/status-regra-badge';
import { Regra } from '@/types/rules';

interface RulesTableProps {
  regras: Regra[];
  onEdit?: (regra: Regra) => void;
  onDelete?: (regraId: string) => void;
}

function SortableHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1">
      {label}
      <div className="flex flex-col">
        <ChevronUp className="h-3 w-3 text-muted-foreground" />
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </div>
    </div>
  );
}

export function RulesTable({ regras, onEdit, onDelete }: RulesTableProps) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {[
                { label: 'Título', sortable: true },
                { label: 'ID', sortable: false },
                { label: 'Repositório', sortable: false },
                { label: 'Categoria', sortable: true },
                { label: 'Gravidade', sortable: true },
                { label: 'Status', sortable: true },
                { label: 'Ações', sortable: false },
              ].map(({ label, sortable }) => (
                <th
                  key={label}
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  {sortable ? <SortableHeader label={label} /> : label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {regras.map((regra) => (
              <tr
                key={regra.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                  {regra.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                <td className="px-6 py-4 text-sm text-muted-foreground max-w-[200px] truncate">
                  {regra.descricao ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                  {regra.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {regra.repositorio ?? '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {regra.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <GravidadeBadge gravidade={regra.gravidade} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusRegraBadge status={regra.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onEdit?.(regra)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onDelete?.(regra.id)}
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
