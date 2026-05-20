import { Check, X, Clock } from 'lucide-react';
import type { PRStatus } from '@/types/pull-request';

const statusConfig: Record<
  string,
  { icon: React.ElementType; className: string }
> = {
  aberto: {
    icon: Clock,
    className: 'bg-blue-500/10   text-blue-400   border-blue-500/20',
  },
  fechado: {
    icon: X,
    className: 'bg-red-500/10    text-red-400    border-red-500/20',
  },
  mergeado: {
    icon: Check,
    className: 'bg-green-500/10  text-green-400  border-green-500/20',
  },
};

export function StatusBadge({ status }: { status: PRStatus }) {
  const { icon: Icon, className } = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium ${className}`}
    >
      <Icon size={12} strokeWidth={2} />
      <span>{status}</span>
    </div>
  );
}
