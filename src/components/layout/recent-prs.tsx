import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { recentPRs } from "@/mocks/dashboard"

const statusStyles = {
  "Em análise": "text-yellow-400",
  "Aprovado":   "text-green-400",
  "Reprovado":  "text-red-400",
}

export function RecentPRs() {
  return (
    <Card className="border-border" style={{ backgroundColor: "#1A2731" }}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">
          PRs Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <ul className="divide-y divide-white/5">
          {recentPRs.map((pr) => (
            <li key={pr.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground min-w-[32px]">
                  #{pr.id}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{pr.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{pr.author}</p>
                </div>
              </div>
              <span className={`text-xs font-medium ${statusStyles[pr.status]}`}>
                {pr.status}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}