import * as React from 'react';
import { http } from '@/services/http';
import type { User } from '@/types/user';

export function useProfile() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    http<User>('/users/me')
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Sessão expirada ou utilizador não autenticado.');
      })
      .finally(() => setLoading(false));
  }, []);

  const updateProfile = async (githubInput: string) => {
    if (!user) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    const payload: Record<string, string> = {
      githubUsername: githubInput,
      avatarUrl: `https://github.com/${githubInput}.png`,
    };

    if (password.length >= 6) payload.password = password;

    http<User>(`/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    })
      .then((updated) => {
        setUser(updated);
        setPassword('');
        setSuccess(true);
      })
      .catch(() => setError('Erro ao guardar alterações.'))
      .finally(() => setSaving(false));
  };

  return {
    user,
    loading,
    saving,
    error,
    success,
    password,
    setPassword,
    updateProfile,
  };
}
