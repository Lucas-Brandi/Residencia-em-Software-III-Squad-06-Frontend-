import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { StatCard } from '@/components/ui/stat-card';
import { ApiKeyCard } from '@/components/layout/api-key-card';
import { IaConfigCard } from '@/components/layout/ia-config-card';
import { UsersTable } from '@/components/layout/users-table';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { InviteUserModal } from '@/components/modals/invite-user-modal';
import { ConfirmDeleteUserModal } from '@/components/modals/confirm-delete-user-modal';
import { adminStatCards, mockUsuarios } from '@/mocks/admin';
import { UsuarioAdmin, RoleUsuario } from '@/types/admin';

export function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | undefined>();
  const [editingUser, setEditingUser] = useState<UsuarioAdmin | undefined>();

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);
  const paginatedUsuarios = filteredUsuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleInviteUser = (userData: {
    nome: string;
    email: string;
    role: RoleUsuario;
  }) => {
    if (editingUser) {
      // Edit existing user - immutable update
      setUsuarios((prev) =>
        prev.map((usuario) =>
          usuario.id === editingUser.id
            ? { ...usuario, nome: userData.nome, role: userData.role }
            : usuario,
        ),
      );
      setEditingUser(undefined);
    } else {
      // Create new user - immutable update
      const newId = `#${usuarios.length + 1}`;
      const newUser: UsuarioAdmin = {
        id: newId,
        nome: userData.nome,
        role: userData.role,
        status: 'Pendente',
        ultimoAcesso: 'Nunca',
      };
      setUsuarios((prev) => [...prev, newUser]);
    }
  };

  const handleDeleteUser = () => {
    if (!deletingUserId) return;

    setUsuarios((prev) =>
      prev.filter((usuario) => usuario.id !== deletingUserId),
    );
    setDeletingUserId(undefined);
  };

  const openDeleteModal = (userId: string) => {
    setDeletingUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (usuario: UsuarioAdmin) => {
    setEditingUser(usuario);
    setIsInviteModalOpen(true);
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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {adminStatCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ApiKeyCard />
            <IaConfigCard />
          </div>

          <UsersTable
            usuarios={paginatedUsuarios}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            searchTerm={searchTerm}
            onSearchChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            onInviteUser={() => setIsInviteModalOpen(true)}
          />

          <PaginationControls
            totalItems={filteredUsuarios.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </main>
      </SidebarInset>

      {/* Modals */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => {
          setIsInviteModalOpen(false);
          setEditingUser(undefined);
        }}
        onSubmit={handleInviteUser}
        editingUser={editingUser}
      />

      <ConfirmDeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingUserId(undefined);
        }}
        onConfirm={handleDeleteUser}
        userName={usuarios.find((u) => u.id === deletingUserId)?.nome}
      />
    </SidebarProvider>
  );
}
