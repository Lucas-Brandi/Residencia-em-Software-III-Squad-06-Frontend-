import * as React from 'react';
import { http } from '@/services/http';
import type { User } from '@/types/user';

function getCurrentUser(): { id: number } | null {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useProfile() {
  const currentUser = getCurrentUser();

  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(!!currentUser);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(
    currentUser ? null : 'Usuário não autenticado.',
  );
  const [success, setSuccess] = React.useState(false);

  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (!currentUser) return;

    http<User>(`/users/${currentUser.id}`)
      .then((data) => {
        setUser(data);
      })
      .catch(() => setError('Erro ao carregar os dados do perfil.'))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const updateProfile = async (githubInput: string) => {
    if (!user || !currentUser) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    const payload: Record<string, string> = {
      githubUsername: githubInput,
      avatarUrl: `https://github.com/${githubInput}.png`,
    };

    if (password.length >= 6) payload.password = password;

    http<User>(`/users/${currentUser.id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    })
      .then((updated) => {
        console.log('updated:', updated);
        setUser(updated);
        setPassword('');
        setSuccess(true);
      })
      .catch(() => setError('Erro ao salvar alterações.'))
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
