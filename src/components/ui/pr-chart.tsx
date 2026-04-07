import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { chartData } from "@/mocks/dashboard"

const chartConfig = {
  prs: {
    label: "PRs",
    color: "#3b82f6",
  },
}

export function PrChart() {
  return (
    <Card className="border-border" style={{ backgroundColor: "#1A2731" }}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">
          PRs Analisados nos últimos 7 dias
        </CardTitle>
      </CardHeader>
        <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
            <BarChart data={chartData} barSize={45}> {/* grossura da barra */}
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
            />
            {/* tooltip removido */}
            <Bar dataKey="prs" fill="#2D8BC8" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartContainer>
        </CardContent>
    </Card>
  )
}