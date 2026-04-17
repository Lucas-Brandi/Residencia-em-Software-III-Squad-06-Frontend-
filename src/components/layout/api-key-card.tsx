import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ApiKeyCard() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Gerenciamento de API Key
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Chave de API Atual
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="password"
              value="**** **** **** 4hA1"
              readOnly
              className="flex-1"
            />
            <Button variant="outline" size="sm">
              Visualizar
            </Button>
            <Button variant="outline" size="sm">
              Regenerar
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="auto-block"
            className="rounded border-border bg-background text-primary focus:ring-primary"
          />
          <label htmlFor="auto-block" className="text-sm text-muted-foreground">
            Auto-bloquear PRs com erros Críticos (ex: Chaves de API Expostas)
          </label>
        </div>

        <div className="flex items-center gap-2 pt-4">
          <Button variant="secondary" className="flex-1">
            Salvar alterações
          </Button>
          <Button variant="outline" className="flex-1">
            Restaurar padrões
          </Button>
        </div>
      </div>
    </Card>
  );
}
