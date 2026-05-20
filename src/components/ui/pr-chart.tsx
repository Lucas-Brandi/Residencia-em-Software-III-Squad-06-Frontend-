import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { pullRequestsService } from '@/services/pull-requests';
import type { DateRange } from 'react-day-picker';

const chartConfig = { prs: { label: 'PRs', color: '#3b82f6' } };

function buildDays(prs: { openedAt: string }[], dateRange?: DateRange) {
  const from =
    dateRange?.from ??
    (() => {
      const d = new Date();
      d.setDate(d.getDate() - 6);
      return d;
    })();
  const to = dateRange?.to ?? new Date();

  const days: { day: string; prs: number }[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);

  while (cursor <= to) {
    const key = cursor.toISOString().slice(0, 10);
    const label = cursor.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
    const count = prs.filter((pr) => pr.openedAt.slice(0, 10) === key).length;
    days.push({ day: label, prs: count });
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

interface PrChartProps {
  dateRange?: DateRange;
}

export function PrChart({ dateRange }: PrChartProps) {
  const [prs, setPrs] = React.useState<{ openedAt: string }[]>([]);

  React.useEffect(() => {
    pullRequestsService
      .getAll()
      .then(setPrs)
      .catch(() => {});
  }, []);

  const chartData = React.useMemo(
    () => buildDays(prs, dateRange),
    [prs, dateRange],
  );

  return (
    <Card className="border-border" style={{ backgroundColor: '#1A2731' }}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">
          PRs Analisados por período
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
