  import { Github, Calendar, Gauge } from "lucide-react"
  import { prAnalysisMock, findings, timeline } from "@/mocks/pr-analysis"
  import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
  import { AppSidebar } from "@/components/layout/app-sidebar"
  import { FindingsFilter } from "@/components/ui/findings-filter"
  import { PRTimeline } from "@/components/ui/pr-timeline"

  export default function PRAnalysis() {
    const pr = prAnalysisMock

    return (
      <SidebarProvider>
        <AppSidebar activePath="" />

        <SidebarInset>
          <main className="min-h-screen p-8 space-y-6">

            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-foreground">
                Análise de Pull Requests: PR #{pr.id} - {pr.title}
              </h1>
            </div>

            {/* Header card */}
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-4 divide-x divide-border" style={{ backgroundColor: "#39505B" }}>
                <div className="flex flex-col items-center justify-center gap-1 p-5">
                  <p className="text-xs text-muted-foreground">Repositório</p>
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                    <Github size={15} className="text-muted-foreground" />
                    {pr.repository}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 p-5">
                  <p className="text-xs text-muted-foreground">Autor do PR</p>
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                    <img
                      src={`https://github.com/${pr.githubUsername}.png?size=32`}
                      alt={pr.author}
                      className="w-6 h-6 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none" }}
                    />
                    {pr.author}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 p-5">
                  <p className="text-xs text-muted-foreground">Enviado em</p>
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                    <Calendar size={15} className="text-muted-foreground" />
                    {pr.sentAt}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 p-5">
                  <p className="text-xs text-muted-foreground">Score</p>
                  <div
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                    style={{ backgroundColor: "#1a3d2b", color: "#4ade80", border: "1px solid #166534" }}
                  >
                    <Gauge size={15} />
                    {pr.score}/100
                  </div>
                </div>
              </div>

              <div className="p-5" style={{ backgroundColor: "#1A2731" }}>
                <p className="text-sm text-muted-foreground leading-relaxed">{pr.summary}</p>
              </div>
            </div>

            {/* Findings + Timeline */}
            <div className="grid grid-cols-[1fr_280px] gap-6 items-start">
              <FindingsFilter findings={findings} />
              <PRTimeline
                events={timeline}
                githubUrl="https://github.com"
                onReanalyze={() => alert("Re-analisando...")}
              />
            </div>

          </main>
        </SidebarInset>
      </SidebarProvider>
    )
  }