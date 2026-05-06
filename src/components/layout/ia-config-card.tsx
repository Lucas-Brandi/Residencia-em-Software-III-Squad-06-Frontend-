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
          <select className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black">
            <option>Gemini</option>
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
              className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer"
              style={{
                background:
                  'linear-gradient(to right, #3b82f6 0%, #3b82f6 50%, #ffffff 50%, #ffffff 100%)',
              }}
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
