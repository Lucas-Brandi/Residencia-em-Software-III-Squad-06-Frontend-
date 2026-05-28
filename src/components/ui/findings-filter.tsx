import * as React from 'react';
import { FindingCard } from '@/components/ui/finding-card';
import type { Finding, FindingCategory } from '@/types/pr-analysis';

const tabs: { label: string; value: FindingCategory }[] = [
  { label: 'Todas', value: 'todas' },
  { label: 'Segurança', value: 'seguranca' },
  { label: 'Solid e Lógica', value: 'solid-logica' },
  { label: 'Estilo e Docs', value: 'estilo-docs' },
];

interface FindingsFilterProps {
  findings: Finding[];
}

export function FindingsFilter({ findings }: FindingsFilterProps) {
  const [active, setActive] = React.useState<FindingCategory>('todas');

  const filtered =
    active === 'todas'
      ? findings
      : findings.filter((f) => f.category === active);

  const countFor = (cat: FindingCategory) =>
    cat === 'todas'
      ? findings.length
      : findings.filter((f) => f.category === cat).length;

  return (
    <div className="space-y-4">
      {/* Tabs — scroll horizontal em mobile */}
      <div className="flex items-center gap-4 border-b border-border overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap shrink-0
              ${
                active === tab.value
                  ? 'text-foreground border-b-2 border-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {tab.label} ({countFor(tab.value)})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((finding) => (
          <FindingCard key={finding.id} {...finding} />
        ))}
      </div>
    </div>
  );
}
