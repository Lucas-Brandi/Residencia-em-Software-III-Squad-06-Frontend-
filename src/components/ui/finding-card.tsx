import * as React from "react"
import { AlertTriangle, CheckCircle, XOctagon, ChevronUp, ChevronDown } from "lucide-react"
import type { Finding, FindingType } from "@/types/pr-analysis"

const config: Record<FindingType, {
  icon: React.ElementType
  label: string
  bg: string
  border: string
  iconColor: string
}> = {
  critico: {
    icon: XOctagon,
    label: "Crítico",
    bg: "#894340",
    border: "#A13F3F",
    iconColor: "#FF4C40",
  },
  aviso: {
    icon: AlertTriangle,
    label: "Aviso",
    bg: "#AA7D1A",
    border: "#A1663F",
    iconColor: "#FFCC73",
  },
  "boa-pratica": {
    icon: CheckCircle,
    label: "Boa Prática",
    bg: "#51885A",
    border: "#307433",
    iconColor: "#7DFF82",
  },
}

export function FindingCard({ type, title, description }: Finding) {
  const [open, setOpen] = React.useState(true)
  const { icon: Icon, bg, border, iconColor } = config[type]

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: border }}
    >
      {/* Header — colorido */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        style={{ backgroundColor: bg }}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} style={{ color: iconColor }} />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        {open
          ? <ChevronUp size={16} className="text-muted-foreground shrink-0" />
          : <ChevronDown size={16} className="text-muted-foreground shrink-0" />
        }
      </button>

      {/* Body — fundo neutro */}
      {open && (
        <div className="px-5 py-4" style={{ backgroundColor: "#1A2731" }}>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  )
}