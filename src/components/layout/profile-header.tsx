import { SidebarTrigger } from '@/components/ui/sidebar';

export function ProfileHeader() {
  return (
    <div className="flex items-center gap-4">
      <SidebarTrigger />

      <div>
        <h1 className="text-2xl font-semibold text-foreground">Perfil</h1>

        <p className="text-sm text-muted-foreground">
          Atualize seus dados pessoais e redes sociais.
        </p>
      </div>
    </div>
  );
}
