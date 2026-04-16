import * as React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { StatCard } from "@/components/ui/stat-card"
import { statCards } from "@/mocks/dashboard"
import { PrChart } from "@/components/ui/pr-chart"
import { RecentPRs } from "@/components/layout/recent-prs"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/layout/date-range-picker"

export default function Dashboard() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 0, 20),
    to: new Date(2026, 1, 9),
  })
    return (
    <SidebarProvider>
      <AppSidebar activePath="/dashboard" />

      <SidebarInset>
        <main className="p-6 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            </div>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
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