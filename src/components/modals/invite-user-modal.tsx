import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RoleUsuario, UsuarioAdmin } from '@/types/admin';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: {
    nome: string;
    email: string;
    role: RoleUsuario;
  }) => void;
  editingUser?: UsuarioAdmin;
}

const roles: RoleUsuario[] = ['Admin', 'Dev', 'Reviewer'];

function InviteUserContent({
  onSubmit,
  onClose,
  editingUser,
}: {
  onSubmit: (userData: {
    nome: string;
    email: string;
    role: RoleUsuario;
  }) => void;
  onClose: () => void;
  editingUser?: UsuarioAdmin;
}) {
  const [formData, setFormData] = useState({
    nome: editingUser?.nome || '',
    email: '',
    role: editingUser?.role || ('Dev' as RoleUsuario),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim()) {
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      title={editingUser ? 'Editar Usuário' : 'Convidar Novo Usuário'}
      description={
        editingUser
          ? 'Edite as informações do usuário.'
          : 'Preencha os dados para convidar um novo usuário para a equipe.'
      }
      footer={
        <>
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-white text-white bg-transparent hover:bg-white/10"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="text-white hover:bg-[#0c2838] active:bg-[#091f2e] transition-colors"
            style={{ backgroundColor: '#0B2437' }}
          >
            {editingUser ? 'Salvar alterações' : 'Enviar convite'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Nome
          </label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, nome: e.target.value }))
            }
            placeholder="Digite o nome do usuário"
            required
            className="bg-white text-black border-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Digite o email do usuário"
            required
            className="bg-white text-black border-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Cargo
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                role: e.target.value as RoleUsuario,
              }))
            }
            className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  );
}

export function InviteUserModal({
  isOpen,
  onClose,
  onSubmit,
  editingUser,
}: InviteUserModalProps) {
  if (!isOpen) return null;

  return (
    <InviteUserContent
      key={editingUser?.id || 'invite-user'}
      onSubmit={onSubmit}
      onClose={onClose}
      editingUser={editingUser}
    />
  );
}
