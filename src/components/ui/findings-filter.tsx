import * as React from "react"
import { FindingCard } from "@/components/ui/finding-card"
import type { Finding, FindingCategory } from "@/types/pr-analysis"

const tabs: { label: string; value: FindingCategory }[] = [
  { label: "Todas as Descobertas", value: "todas"       },
  { label: "Segurança",            value: "seguranca"   },
  { label: "Solid e Lógica",       value: "solid-logica"},
  { label: "Estilo de Código e Docs", value: "estilo-docs" },
]

interface FindingsFilterProps {
  findings: Finding[]
}

export function FindingsFilter({ findings }: FindingsFilterProps) {
  const [active, setActive] = React.useState<FindingCategory>("todas")

  const filtered = active === "todas"
    ? findings
    : findings.filter((f) => f.category === active)

  const countFor = (cat: FindingCategory) =>
    cat === "todas" ? findings.length : findings.filter((f) => f.category === cat).length

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap
              ${active === tab.value
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {tab.label} ({countFor(tab.value)})
          </button>
        ))}
      </div>

      {/* Cards filtrados */}
      <div className="space-y-3">
        {filtered.map((finding) => (
          <FindingCard key={finding.id} {...finding} />
        ))}
      </div>
    </div>
  )
}