import { Button } from "@/components/ui/button"
import type { TimelineEvent } from "@/types/pr-analysis"
import { Github, RefreshCw } from "lucide-react"

interface PRTimelineProps {
  events: TimelineEvent[]
  githubUrl?: string
  onReanalyze?: () => void
}

export function PRTimeline({ events, githubUrl, onReanalyze }: PRTimelineProps) {
  return (
    <div
      className="rounded-xl border border-border p-5 flex flex-col gap-6 h-fit"
      style={{ backgroundColor: "#1A2731" }}
    >
      <p className="text-sm font-medium text-foreground">Linha do tempo</p>

      {/* Timeline */}
      <div className="flex flex-col gap-4">
        {events.map((event, index) => (
          <div key={event.id} className="flex items-start gap-3">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0 mt-0.5" />
              {index < events.length - 1 && (
                <div className="w-px flex-1 bg-border mt-1" style={{ minHeight: "24px" }} />
              )}
            </div>
            {/* Label */}
            <div className="pb-2">
              <p className="text-xs text-foreground leading-snug">{event.label}</p>
              {event.time && (
                <p className="text-xs text-muted-foreground mt-0.5">({event.time})</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border" />

      {/* Botões */}
        <div className="flex gap-2">
        {/* GitHub */}
        <Button
            className="flex-1 gap-2 text-sm bg-white text-black hover:bg-white/90 border-0"
            onClick={() => githubUrl && window.open(githubUrl, "_blank")}
        >
            <Github size={15} />
            GitHub
        </Button>

        {/* Reanalisar */}
        <Button
            className="flex-1 gap-2 text-sm text-white"
            style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1.5px solid #D6D6D6",
            }}
            onClick={onReanalyze}
        >
            <RefreshCw size={15} />
            Re-Analisar
        </Button>
        </div>

    </div>
  )
}