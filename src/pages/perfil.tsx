import * as React from 'react'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserCircle } from 'lucide-react'
import type { User } from '@/types/user'

// O id 1 corresponde ao john doe criado no banco local
const CURRENT_USER_ID = 1

export function Perfil() {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const [avatarError, setAvatarError] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [githubInput, setGithubInput] = React.useState('')
  const [token, setToken] = React.useState<string>('')

  React.useEffect(() => {
    fazerLoginFantasma()
  }, [])

  // 1 - Autentica com o john doe para obter o token jwt
  const fazerLoginFantasma = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: "john_doe",
          password: "SecurePass123" 
        })
      })

      const data = await response.json()

      if (data.accessToken) {
        setToken(data.accessToken)
        fetchUserProfile(data.accessToken)
      } else {
        setError('Erro na autenticação do perfil.')
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      setError('Erro de conexão ao autenticar.')
      setLoading(false)
    }
  }

  // 2 - Busca os dados do perfil usando o token obtido
  const fetchUserProfile = async (currentToken: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${CURRENT_USER_ID}`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data)
        setGithubInput(data.githubUsername || '') 
      } else {
        setError('Erro ao carregar os dados do perfil.')
      }
    } catch (err) {
      console.error(err)
      setError('Erro de conexão ao buscar perfil.')
    } finally {
      setLoading(false)
    }
  }

  // 3 - Envia as atualizações protegidas pelo token
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !token) return
    
    setSaving(true)
    setError(null)
    setSuccess(false)
    setAvatarError(false)

    try {
      const payload: any = {
        githubUsername: githubInput,
      }
      
      if (password.length >= 6) {
        payload.password = password
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${CURRENT_USER_ID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setSuccess(true)
        setPassword('')
        setUser({ ...user, githubUsername: githubInput })
      } else {
        setError('Erro ao salvar alterações.')
      }
    } catch (err) {
      console.error(err)
      setError('Erro de conexão ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activePath="/perfil" />

      <SidebarInset>
        <main className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Perfil</h1>
              <p className="text-sm text-muted-foreground">
                Atualize seus dados pessoais e redes sociais.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center pt-8 pb-20 relative">
            
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-full -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-0 -translate-y-1/2 pointer-events-none" />

            <Card className="w-full max-w-2xl border-border relative z-10" style={{ backgroundColor: '#1A2731' }}>

              <CardHeader className="pb-4 border-b border-border text-center">
                <CardTitle className="text-lg font-semibold">Minha Conta</CardTitle>
                <CardDescription>Gerencie suas informações abaixo.</CardDescription>
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
                          placeholder="Ex: seu-usuario-aqui"
                          value={githubInput}
                          onChange={(e) => setGithubInput(e.target.value)}
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

        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
