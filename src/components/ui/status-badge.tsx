import { Check, X, Clock, AlertTriangle } from 'lucide-react'
import type { PRStatus } from '@/types/pull-request'

const statusConfig: Record<PRStatus, {
  icon: React.ElementType
  className: string
}> = {
  'Aprovado':            { icon: Check,         className: 'bg-green-500/10  text-green-400  border-green-500/20'  },
  'Reprovado':           { icon: X,             className: 'bg-red-500/10    text-red-400    border-red-500/20'    },
  'Em análise':          { icon: Clock,         className: 'bg-blue-500/10   text-blue-400   border-blue-500/20'   },
  'Aprovado com alertas':{ icon: AlertTriangle, className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
}

export function StatusBadge({ status }: { status: PRStatus }) {
  const { icon: Icon, className } = statusConfig[status]

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium ${className}`}>
      <Icon size={12} strokeWidth={2} />
      <span>{status}</span>
    </div>
  )
}