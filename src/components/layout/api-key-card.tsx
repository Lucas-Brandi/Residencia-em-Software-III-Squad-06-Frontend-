import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ApiKeyCard() {
  const [showApiKey, setShowApiKey] = useState(false);

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

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
            <div className="relative flex-1">
              <Input
                type={showApiKey ? 'text' : 'password'}
                value="**** **** **** 4hA1"
                readOnly
                className="w-full bg-white text-black border-gray-200 pr-10"
                style={{ WebkitTextFillColor: 'black' }}
              />
              <button
                type="button"
                onClick={toggleApiKeyVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <Button
              variant="default"
              size="sm"
              className="bg-white text-black hover:bg-gray-100"
            >
              Visualizar
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-white text-black hover:bg-gray-100"
            >
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
          <Button
            variant="default"
            className="flex-1 bg-white text-black hover:bg-gray-100 rounded-lg max-w-xs"
          >
            Salvar alterações
          </Button>
          <Button variant="outline" className="flex-1 rounded-lg max-w-xs">
            Restaurar padrões
          </Button>
        </div>
      </div>
    </Card>
  );
}
