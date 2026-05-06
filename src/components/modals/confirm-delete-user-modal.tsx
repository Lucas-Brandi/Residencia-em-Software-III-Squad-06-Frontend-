import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface ConfirmDeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export function ConfirmDeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: ConfirmDeleteUserModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Excluir usuário"
      description={
        userName
          ? `Tem certeza que deseja remover o usuário "${userName}"?`
          : 'Tem certeza que deseja remover este usuário?'
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Excluir
          </Button>
        </>
      }
    >
      <div className="text-sm text-muted-foreground">
        Esta ação não pode ser desfeita. O usuário será permanentemente removido
        do sistema.
      </div>
    </Modal>
  );
}
