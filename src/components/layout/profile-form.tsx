import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProfileFormProps {
  username: string;
  githubInput: string;
  password: string;
  saving: boolean;
  error: string | null;
  success: boolean;
  onPasswordChange: (value: string) => void;
  onSubmit: (githubInput: string) => void;
}

export function ProfileForm({
  username,
  githubInput: initialGithub,
  password,
  saving,
  error,
  success,
  onPasswordChange,
  onSubmit,
}: ProfileFormProps) {
  const [githubInput, setGithubInput] = React.useState(initialGithub);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit chamado, github:', githubInput);

    onSubmit(githubInput);
  };

  return (
    <form className="flex-1 space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Usuário</label>
        <Input
          value={username}
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
          value={githubInput}
          onChange={(e) => setGithubInput(e.target.value)}
          placeholder="Ex: seu-usuario-aqui"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Nova senha
        </label>
        <Input
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
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
  );
}
