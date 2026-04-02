import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar activePath="/dashboard" />

      <SidebarInset>
        <header className="flex items-center px-4 py-3">
          <SidebarTrigger />
        </header>

        <main className="flex-1 p-6">
          {/* conteúdo aqui */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}