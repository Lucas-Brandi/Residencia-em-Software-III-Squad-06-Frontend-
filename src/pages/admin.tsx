import { useState, useRef } from 'react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { StatCard } from '@/components/ui/stat-card';
import { UsersTable } from '@/components/layout/users-table';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { InviteUserModal } from '@/components/modals/invite-user-modal';
import { ConfirmDeleteUserModal } from '@/components/modals/confirm-delete-user-modal';
import { useAdmin } from '@/hooks/use-admin';
import type { UsuarioAdmin, RoleUsuario } from '@/types/admin';

export function Admin() {
  const { usuarios, loading, error, statCards, invite, update, remove } =
    useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<number | undefined>();
  const [editingUser, setEditingUser] = useState<UsuarioAdmin | undefined>();
  const editingUserRef = useRef<UsuarioAdmin | undefined>(undefined);

  const filtered = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSubmit = async (data: {
    nome: string;
    email: string;
    role: RoleUsuario;
    password?: string;
  }) => {
    if (editingUserRef.current) {
      await update(editingUserRef.current.id, data);
      editingUserRef.current = undefined;
      setEditingUser(undefined);
    } else {
      await invite(data);
    }
    setIsInviteOpen(false);
  };

  const handleDelete = async () => {
    if (!deletingUserId) return;
    await remove(deletingUserId);
    setIsDeleteOpen(false);
    setDeletingUserId(undefined);
  };

  return (
    <SidebarProvider>
      <AppSidebar activePath="/admin" />
      <SidebarInset>
        <main className="p-8 space-y-8">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                Administração
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie usuários, configurações e acesso ao sistema
              </p>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando usuários...
            </p>
          ) : (
            <>
              <UsersTable
                usuarios={paginated}
                onEdit={(u) => {
                  editingUserRef.current = u;
                  setEditingUser(u);
                  setIsInviteOpen(true);
                }}
                onDelete={(id) => {
                  setDeletingUserId(id);
                  setIsDeleteOpen(true);
                }}
                searchTerm={searchTerm}
                onSearchChange={(v) => {
                  setSearchTerm(v);
                  setCurrentPage(1);
                }}
                onInviteUser={() => setIsInviteOpen(true)}
              />
              <PaginationControls
                totalItems={filtered.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(n) => {
                  setItemsPerPage(n);
                  setCurrentPage(1);
                }}
              />
            </>
          )}
        </main>
      </SidebarInset>

      <InviteUserModal
        isOpen={isInviteOpen}
        onClose={() => {
          editingUserRef.current = undefined;
          setIsInviteOpen(false);
          setEditingUser(undefined);
        }}
        onSubmit={handleSubmit}
        editingUser={editingUser}
      />

      <ConfirmDeleteUserModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingUserId(undefined);
        }}
        onConfirm={handleDelete}
        userName={usuarios.find((u) => u.id === deletingUserId)?.nome}
      />
    </SidebarProvider>
  );
}
