import { SidebarTrigger } from '@/components/ui/sidebar';

export function RegraHeader() {
  return (
    <div className="flex items-center gap-4">
      <SidebarTrigger />
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Regras</h1>
        <p className="text-sm text-muted-foreground">
          Defina e gerencie os critérios de avaliação de Pull Requests.
        </p>
      </div>
    </div>
  );
}
