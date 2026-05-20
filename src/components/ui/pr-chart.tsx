import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { pullRequestsService } from '@/services/pull-requests';

const chartConfig = { prs: { label: 'PRs', color: '#3b82f6' } };

function buildLast7Days(prs: { openedAt: string }[]) {
  const days: { day: string; prs: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('pt-BR', { weekday: 'short' });
    const count = prs.filter((pr) => pr.openedAt.slice(0, 10) === key).length;
    days.push({ day: label, prs: count });
  }

  return days;
}

export function PrChart() {
  const [chartData, setChartData] = React.useState<
    { day: string; prs: number }[]
  >([]);

  React.useEffect(() => {
    pullRequestsService
      .getAll()
      .then((prs) => setChartData(buildLast7Days(prs)))
      .catch(() => {});
  }, []);

  return (
    <Card className="border-border" style={{ backgroundColor: '#1A2731' }}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">
          PRs Analisados nos últimos 7 dias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <BarChart data={chartData} barSize={45}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
            />
            <Bar dataKey="prs" fill="#2D8BC8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
