import { CheckCircle, Clock } from 'lucide-react';
import { StatusUsuario } from '@/types/admin';
import { cn } from '@/lib/utils';

interface StatusUsuarioBadgeProps {
  status: StatusUsuario;
}

export function StatusUsuarioBadge({ status }: StatusUsuarioBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case 'Ativo':
        return 'border-green-500/30 text-green-400 bg-green-500/10';
      case 'Pendente':
        return 'border-amber-500/30 text-amber-400 bg-amber-500/10';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'Ativo':
        return <CheckCircle className="h-3 w-3" />;
      case 'Pendente':
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium',
        getStyles(),
      )}
    >
      {getIcon()}
      {status}
    </div>
  );
}
