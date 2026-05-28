import { SidebarTrigger } from '@/components/ui/sidebar';

export function RepositorioHeader() {
  return (
    <div className="flex items-center gap-4">
      <SidebarTrigger />
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Repositórios</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie os repositórios vinculados ao Diffy AI.
        </p>
      </div>
    </div>
  );
}
