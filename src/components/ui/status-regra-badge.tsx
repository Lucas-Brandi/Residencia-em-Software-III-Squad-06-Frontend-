import { CheckCircle, BellOff } from 'lucide-react';
import { StatusRegra } from '@/types/rules';
import { cn } from '@/lib/utils';

interface StatusRegraBadgeProps {
  status: StatusRegra;
}

export function StatusRegraBadge({ status }: StatusRegraBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case 'Ativo':
        return 'border-green-500/30 text-green-400 bg-green-500/10';
      case 'Inativo':
        return 'border-muted-foreground/30 text-muted-foreground bg-muted';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'Ativo':
        return <CheckCircle className="h-3 w-3" />;
      case 'Inativo':
        return <BellOff className="h-3 w-3" />;
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
