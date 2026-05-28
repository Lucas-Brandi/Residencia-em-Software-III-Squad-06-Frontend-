import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RepositorioSearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onAdd: () => void;
}

export function RepositorioSearchBar({
  value,
  onChange,
  onAdd,
}: RepositorioSearchBarProps) {
  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Pesquisar"
        className="w-64"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button onClick={onAdd}>+ Adicionar Repositório</Button>
    </div>
  );
}
