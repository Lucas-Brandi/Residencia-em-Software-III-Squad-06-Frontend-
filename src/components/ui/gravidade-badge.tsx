import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Gravidade } from '@/types/rules';
import { cn } from '@/lib/utils';

interface GravidadeBadgeProps {
  gravidade: Gravidade;
}

export function GravidadeBadge({ gravidade }: GravidadeBadgeProps) {
  const getStyles = () => {
    switch (gravidade) {
      case 'Crítico':
        return 'border-red-500/30 text-red-400 bg-red-500/10';
      case 'Aviso':
        return 'border-amber-500/30 text-amber-400 bg-amber-500/10';
      case 'Dica':
        return 'border-green-500/30 text-green-400 bg-green-500/10';
    }
  };

  const getIcon = () => {
    switch (gravidade) {
      case 'Crítico':
        return <AlertTriangle className="h-3 w-3" />;
      case 'Aviso':
        return <AlertTriangle className="h-3 w-3" />;
      case 'Dica':
        return <CheckCircle className="h-3 w-3" />;
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
      {gravidade}
    </div>
  );
}
