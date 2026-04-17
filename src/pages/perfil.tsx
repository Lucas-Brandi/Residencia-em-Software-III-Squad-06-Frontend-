import { UserCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Perfil() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #0a1628 0%, #0d2340 40%, #0f2d4a 70%, #0a1628 100%)',
      }}
    >
      {/* Decorative light streaks */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        <Card
          className="p-8 rounded-2xl"
          style={{ backgroundColor: 'oklch(0.22 0.02 220)' }}
        >
          {/* App name */}
          <div className="text-center mb-6">
            <div className="text-xs tracking-widest uppercase text-muted-foreground mb-4">
              STARIAN
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Update your account settings. Set your preferred language and
              timezone.
            </p>
          </div>

          {/* Horizontal rule */}
          <div className="border-t border-border mb-6" />

          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <form className="space-y-6">
                {/* Nome field */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nome
                  </label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Esse será o nome usado no perfil e nos e-mails.
                  </p>
                </div>

                {/* Data de nascimento field */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Data de nascimento
                  </label>
                  <Input type="date" className="w-full" />
                </div>

                {/* Idioma field */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Idioma
                  </label>
                  <select className="w-full h-10 rounded border border-border bg-background px-3 text-sm">
                    <option>Selecione o idioma</option>
                    <option>pt-BR</option>
                    <option>en-US</option>
                    <option>es</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Esse será o idioma usado no dashboard.
                  </p>
                </div>

                {/* Submit button */}
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full rounded-xl"
                >
                  Editar
                </Button>
              </form>
            </div>

            {/* Avatar placeholder */}
            <div className="ml-8">
              <UserCircle size={72} className="text-muted-foreground" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
