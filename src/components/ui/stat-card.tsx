import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"


interface StatCardProps {
  title: string
  value: number
  change: string
  icon: LucideIcon
}

export function StatCard({ title, value, change, icon: Icon, className }: StatCardProps) {
  return (
    <Card 
      className={cn("border-border", className)} 
      style={!className ? { backgroundColor: "#1A2731" } : undefined}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon size={16} className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{change}</p>
      </CardContent>
    </Card>
  )
}