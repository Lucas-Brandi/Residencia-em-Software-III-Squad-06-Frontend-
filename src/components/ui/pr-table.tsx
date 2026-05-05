import { useNavigate } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { PullRequest } from '@/types/pull-request'

interface PRTableProps {
  pullRequests: PullRequest[]
}

export function PRTable({ pullRequests }: PRTableProps) {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {['ID', 'Título', 'Autor', 'Status', ''].map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider last:text-right"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {pullRequests.map((pr) => (
            <tr key={pr.id} className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-foreground">
                #{pr.id}
              </td>
              <td className="px-6 py-4 text-sm text-foreground">
                {pr.title}
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">
                {pr.author}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={pr.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-xs">
                      <MoreHorizontal size={14} strokeWidth={1.5} />
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
                      Ver PR #{pr.id}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}