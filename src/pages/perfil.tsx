import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { AppSidebar } from '@/components/layout/app-sidebar';

import { ProfileHeader } from '@/components/layout/profile-header';
import { ProfileAvatar } from '@/components/layout/profile-avatar';
import { ProfileForm } from '@/components/layout/profile-form';

import { useProfile } from '@/hooks/use-profile';

export function Perfil() {
  const {
    user,
    loading,
    saving,
    error,
    success,
    password,
    setPassword,
    updateProfile,
  } = useProfile();

  return (
    <SidebarProvider>
      <AppSidebar activePath="/perfil" />

      <SidebarInset>
        <main className="p-6 space-y-6">
          <ProfileHeader />

          <div className="flex items-center justify-center pt-8 pb-20 relative">
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-full -translate-y-1/2 pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-0 -translate-y-1/2 pointer-events-none" />

            <Card
              className="w-full max-w-2xl border-border relative z-10"
              style={{ backgroundColor: '#1A2731' }}
            >
              <CardHeader className="pb-4 border-b border-border text-center">
                <CardTitle className="text-lg font-semibold">
                  Minha Conta
                </CardTitle>

                <CardDescription>
                  Gerencie suas informações abaixo.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                {loading && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Carregando...
                  </p>
                )}

                {!loading && error && !user && (
                  <p className="text-sm text-red-400 text-center py-8">
                    {error}
                  </p>
                )}

                {!loading && user && (
                  <div className="flex items-start gap-8">
                    <ProfileForm
                      username={user.username}
                      githubInput={user.githubUsername ?? ''}
                      password={password}
                      saving={saving}
                      error={error}
                      success={success}
                      onPasswordChange={setPassword}
                      onSubmit={updateProfile}
                    />

                    <ProfileAvatar user={user} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
