import * as React from 'react'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserCircle } from 'lucide-react'

// Virá do contexto de autenticação quando a API estiver pronta
const mockUser = {
  name: 'Olivia Silva',
  githubUsername: 'iancacarregosa',
  birthdate: '1998-04-12',
  language: 'pt-BR',
}

export function Perfil() {
  const [avatarError, setAvatarError] = React.useState(false)

  return (
    <SidebarProvider>
      <AppSidebar activePath="/perfil" />

      <SidebarInset>
        <div className="relative min-h-screen flex flex-col">

          {/* Trigger fixo no topo */}
          <div className="absolute top-6 left-6 z-10">
            <SidebarTrigger />
          </div>

          {/* Blobs decorativos */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

          {/* Conteúdo centralizado */}
          <div className="flex-1 flex items-center justify-center px-6 py-20">
            <Card className="w-full max-w-2xl border-border" style={{ backgroundColor: '#1A2731' }}>

              <CardHeader className="pb-4 border-b border-border text-center">
                <CardTitle className="text-lg font-semibold">Minha Conta</CardTitle>
                <CardDescription>
                  Atualize seus dados pessoais e preferências.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="flex items-start gap-8">

                  {/* Formulário */}
                  <form className="flex-1 space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Nome</label>
                      <Input type="text" defaultValue={mockUser.name} placeholder="Seu nome" />
                      <p className="text-xs text-muted-foreground">
                        Esse será o nome usado no perfil e nos e-mails.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Data de nascimento</label>
                      <Input type="date" defaultValue={mockUser.birthdate} />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Idioma</label>
                      <select
                        defaultValue={mockUser.language}
                        className="w-full h-10 rounded-md border border-border px-3 text-sm text-foreground outline-none"
                        style={{ backgroundColor: '#0f1c26' }}
                      >
                        <option value="">Selecione o idioma</option>
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es">Español</option>
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Esse será o idioma usado no dashboard.
                      </p>
                    </div>

                    <Button className="w-full" style={{ backgroundColor: '#39505B', color: '#FFFFFF' }}>
                      Salvar alterações
                    </Button>
                  </form>

                  {/* Avatar do GitHub */}
                  <div className="flex flex-col items-center gap-2 pt-1">
                    {!avatarError ? (
                      <img
                        src={`https://github.com/${mockUser.githubUsername}.png?size=96`}
                        alt={mockUser.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-border"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center"
                        style={{ backgroundColor: '#0f1c26' }}
                      >
                        <UserCircle size={48} className="text-muted-foreground" />
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">
                      @{mockUser.githubUsername}
                    </span>
                  </div>

                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}