import { Card } from '@/components/ui/card';

export function IaConfigCard() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Configurações globais da IA
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Modelo de IA Principal
          </label>
          <select className="w-full h-10 rounded border border-border bg-background px-3 text-sm">
            <option>GPT-4</option>
            <option>Claude 3.5 Sonnet</option>
            <option>Custom</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Rigidez da Análise
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Suave</span>
              <span>Rigoroso</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
