import { CheckCircle, Clock } from 'lucide-react';
import { StatusUsuario } from '@/types/admin';
import { cn } from '@/lib/utils';

interface StatusUsuarioBadgeProps {
  status: StatusUsuario;
}

const statusMap: Record<
  StatusUsuario,
  { label: string; styles: string; icon: React.ReactNode }
> = {
  ATIVO: {
    label: 'Ativo',
    styles: 'border-green-500/30 text-green-400 bg-green-500/10',
    icon: <CheckCircle className="h-3 w-3" />,
  },
  PENDENTE: {
    label: 'Pendente',
    styles: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    icon: <Clock className="h-3 w-3" />,
  },
};

export function StatusUsuarioBadge({ status }: StatusUsuarioBadgeProps) {
  const config = statusMap[status];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium',
        config.styles,
      )}
    >
      {config.icon}
      {config.label}
    </div>
  );
}
