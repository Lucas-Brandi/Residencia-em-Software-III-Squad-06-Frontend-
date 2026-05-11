import * as React from 'react'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PRTable } from '@/components/ui/pr-table'
import { mockPullRequests } from '@/mocks/pull-requests'

export default function PullRequests() {
  return (
    <SidebarProvider>
      <AppSidebar activePath="/prs" />

      <SidebarInset>
        <main className="p-6 space-y-6">

          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Pull Requests</h1>
              <p className="text-sm text-muted-foreground">Veja todos os pull requests salvos</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Input placeholder="Filtrar por data" className="w-64" />
          </div>

          <Card className="overflow-hidden">
            <PRTable pullRequests={mockPullRequests} />
          </Card>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">0 de 100 linhas</p>
            <div className="flex items-center gap-4">
              <select className="h-8 rounded-lg border border-input bg-background px-2.5 py-1 text-sm text-foreground outline-none">
                <option value="10">10 linhas por página</option>
                <option value="25">25 linhas por página</option>
                <option value="50">50 linhas por página</option>
                <option value="100">100 linhas por página</option>
              </select>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon-xs">
                  <ChevronLeft size={14} strokeWidth={1.5} />
                </Button>
                <span className="px-3 py-1 text-sm text-muted-foreground">Página 1 de 10</span>
                <Button variant="outline" size="icon-xs">
                  <ChevronRight size={14} strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </div>

        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}