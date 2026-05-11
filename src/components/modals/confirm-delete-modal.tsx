import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ruleTitle?: string;
}

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  ruleTitle,
}: ConfirmDeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Excluir regra"
      description={
        ruleTitle
          ? `Tem certeza que deseja excluir a regra "${ruleTitle}"?`
          : 'Tem certeza que deseja excluir esta regra?'
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
        Esta ação não pode ser desfeita. A regra será permanentemente removida
        do sistema.
      </div>
    </Modal>
  );
}
