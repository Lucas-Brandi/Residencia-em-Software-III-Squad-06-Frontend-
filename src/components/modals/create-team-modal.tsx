import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usersService } from '@/services/users';
import type { User } from '@/types/user';
import { X } from 'lucide-react';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description?: string;
    leaderId?: number;
    initialMemberIds?: number[];
  }) => Promise<void> | void;
}

export function CreateTeamModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateTeamModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    leaderId: '',
    initialMemberIds: [] as number[],
  });
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const userList = await usersService.getAll();
      setUsers(userList);
    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      setError('Erro ao carregar lista de usuários');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const timeout = window.setTimeout(() => {
      void loadUsers();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = formData.name.trim();
    if (!trimmed) return;

    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: trimmed,
        description: formData.description || undefined,
        leaderId: formData.leaderId ? Number(formData.leaderId) : undefined,
        initialMemberIds:
          formData.initialMemberIds.length > 0
            ? formData.initialMemberIds
            : undefined,
      });
      resetForm();
      onClose();
    } catch (err) {
      setError('Erro ao criar equipe. Verifique os dados e tente novamente.');
      console.error('Erro no modal de criar equipe:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError('');
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      leaderId: '',
      initialMemberIds: [],
    });
  };

  const toggleMember = (userId: number) => {
    setFormData((prev) => ({
      ...prev,
      initialMemberIds: prev.initialMemberIds.includes(userId)
        ? prev.initialMemberIds.filter((id) => id !== userId)
        : [...prev.initialMemberIds, userId],
    }));
  };

  if (!isOpen) return null;

  const selectedMembers = users.filter((u) =>
    formData.initialMemberIds.includes(u.id),
  );
  const availableMembers = users.filter(
    (u) => !formData.initialMemberIds.includes(u.id),
  );
  const leaderUser = users.find((u) => Number(formData.leaderId) === u.id);

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      title="Criar equipe"
      description="Preencha todos os dados para criar uma nova equipe"
      footer={
        <>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="border-white text-white bg-transparent hover:bg-white/10"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.name.trim()}
            className="text-white hover:bg-[#0c2838] active:bg-[#091f2e] transition-colors"
            style={{ backgroundColor: '#0B2437' }}
          >
            {isSubmitting ? 'Criando...' : 'Criar equipe'}
          </Button>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[70vh] overflow-y-auto"
      >
        {/* NOME */}
        <div>
          <label
            htmlFor="team-name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Nome da equipe *
          </label>
          <Input
            id="team-name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Ex: Squad 06"
            required
            className="bg-white text-black border-gray-200"
          />
          <p className="text-xs text-muted-foreground mt-1">Obrigatório</p>
        </div>

        {/* DESCRIÇÃO */}
        <div>
          <label
            htmlFor="team-description"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Descrição
          </label>
          <textarea
            id="team-description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Descreva o propósito da equipe..."
            rows={3}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-black placeholder-gray-400 focus:border-primary focus:outline-none"
          />
          <p className="text-xs text-muted-foreground mt-1">Opcional</p>
        </div>

        {/* LÍDER */}
        <div>
          <label
            htmlFor="team-leader"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Líder da equipe
          </label>
          {loadingUsers ? (
            <div className="text-sm text-muted-foreground">
              Carregando usuários...
            </div>
          ) : (
            <select
              id="team-leader"
              value={formData.leaderId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, leaderId: e.target.value }))
              }
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-black focus:border-primary focus:outline-none"
            >
              <option value="">Nenhum líder</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.email || 'sem email'})
                </option>
              ))}
            </select>
          )}
          {leaderUser && (
            <p className="text-xs text-blue-400 mt-1">
              Líder: {leaderUser.username}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">Opcional</p>
        </div>

        {/* MEMBROS */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Membros iniciais ({formData.initialMemberIds.length})
          </label>

          {selectedMembers.length > 0 && (
            <div className="mb-4 space-y-2">
              <p className="text-xs text-muted-foreground font-semibold">
                Selecionados:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.map((user) => (
                  <div
                    key={user.id}
                    className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs text-primary"
                  >
                    <span>{user.username}</span>
                    <button
                      type="button"
                      onClick={() => toggleMember(user.id)}
                      className="hover:opacity-70"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loadingUsers ? (
            <div className="text-sm text-muted-foreground">
              Carregando usuários...
            </div>
          ) : availableMembers.length > 0 ? (
            <div className="max-h-40 overflow-y-auto space-y-2 border border-gray-200 rounded-md p-3 bg-white">
              {availableMembers.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() => toggleMember(user.id)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-black">{user.username}</span>
                  <span className="text-xs text-gray-400">
                    ({user.email || 'sem email'})
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Todos os usuários já estão selecionados
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1">Opcional</p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </Modal>
  );
}
