import * as React from 'react'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserCircle } from 'lucide-react'
import { usersService } from '@/services/users'
import type { User } from '@/types/user'

// Substituir pelo ID do usuário logado quando auth estiver pronto
const CURRENT_USER_ID = 1

export function Perfil() {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const [avatarError, setAvatarError] = React.useState(false)
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    usersService.getById(CURRENT_USER_ID)
      .then(setUser)
      .catch(() => setError('Erro ao carregar perfil.'))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      await usersService.update(CURRENT_USER_ID, {
        ...(password.length >= 6 ? { password } : {}),
      })
      setSuccess(true)
      setPassword('')
    } catch {
      setError('Erro ao salvar alterações.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activePath="/perfil" />

      <SidebarInset>
        <div className="relative min-h-screen flex flex-col">

          <div className="absolute top-6 left-6 z-10">
            <SidebarTrigger />
          </div>

          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="flex-1 flex items-center justify-center px-6 py-20">
            <Card className="w-full max-w-2xl border-border" style={{ backgroundColor: '#1A2731' }}>

              <CardHeader className="pb-4 border-b border-border text-center">
                <CardTitle className="text-lg font-semibold">Minha Conta</CardTitle>
                <CardDescription>Atualize seus dados pessoais.</CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                {loading && (
                  <p className="text-sm text-muted-foreground text-center py-8">Carregando...</p>
                )}

                {!loading && user && (
                  <div className="flex items-start gap-8">

                    <form className="flex-1 space-y-5" onSubmit={handleSubmit}>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Usuário</label>
                        <Input
                          type="text"
                          value={user.username}
                          disabled
                          className="opacity-60 cursor-not-allowed"
                        />
                        <p className="text-xs text-muted-foreground">
                          Nome de usuário não pode ser alterado.
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">GitHub</label>
                        <Input
                          type="text"
                          value={user.githubUsername ?? ''}
                          disabled
                          className="opacity-60 cursor-not-allowed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">Nova senha</label>
                        <Input
                          type="password"
                          placeholder="Mínimo 6 caracteres"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Deixe vazio para manter a senha atual.
                        </p>
                      </div>

                      {error && <p className="text-sm text-red-400">{error}</p>}
                      {success && <p className="text-sm text-green-400">Alterações salvas!</p>}

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={saving}
                        style={{ backgroundColor: '#39505B', color: '#FFFFFF' }}
                      >
                        {saving ? 'Salvando...' : 'Salvar alterações'}
                      </Button>
                    </form>

                    <div className="flex flex-col items-center gap-2 pt-1">
                      {!avatarError && user.githubUsername ? (
                        <img
                          src={`https://github.com/${user.githubUsername}.png?size=96`}
                          alt={user.username}
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
                        @{user.githubUsername ?? user.username}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {user.role}
                      </span>
                    </div>

                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}