import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { StatCard } from "@/components/ui/stat-card"
import { statCards } from "@/mocks/dashboard"
import { PrChart } from "@/components/ui/pr-chart"
import { RecentPRs } from "@/components/layout/recent-prs"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar activePath="/dashboard" />

      <SidebarInset>
        <main className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statCards.map((card) => (
              <StatCard key={card.title} {...card} />
            ))}
          </div>

          {/* Gráfico + PRs Recentes */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <PrChart />
            <RecentPRs />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}