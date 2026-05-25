import { useState, useRef, useEffect, useMemo } from 'react';
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
import { DateRangePicker } from '@/components/layout/date-range-picker';
import { PrChart } from '@/components/ui/pr-chart';
import { RecentPRs } from '@/components/layout/recent-prs';
import { adminStatCards, mockUsuarios } from '@/mocks/admin';
import { UsuarioAdmin, mapUserToUsuarioAdmin } from '@/types/admin';
import type { PullRequest } from '@/types/pull-request';
import { usersService } from '@/services/users';

type DateRange = {
  from?: Date;
  to?: Date;
};
import { pullRequestsService } from '@/services/pull-requests';
import { buildStatCards } from '@/services/dashboard';

export function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<number | undefined>();
  const [editingUser, setEditingUser] = useState<UsuarioAdmin | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const editingUserRef = useRef<UsuarioAdmin | undefined>(undefined);

  function getDefaultDateRange(): DateRange {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 6);
    return { from, to };
  }

  function filterByDateRange(prs: PullRequest[], dateRange?: DateRange) {
    if (!dateRange?.from) return prs;

    const from = dateRange.from;
    const to = dateRange.to ?? dateRange.from;

    return prs.filter((pr) => {
      const opened = new Date(pr.openedAt);
      return opened >= from && opened <= to;
    });
  }

  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [prLoading, setPrLoading] = useState(true);
  const [prError, setPrError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    getDefaultDateRange(),
  );

  // Buscar usuários ao carregar a página
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const users = await usersService.getAll();
        const usuariosAdmin = users.map(mapUserToUsuarioAdmin);
        setUsuarios(usuariosAdmin);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        setError('Erro ao carregar usuários. Usando dados de exemplo.');
        // Fallback para dados mockados em caso de erro
        setUsuarios(mockUsuarios);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        setPrLoading(true);
        setPrError(null);
        const result = await pullRequestsService.getAll();
        setPrs(result);
      } catch (err) {
        console.error('Erro ao buscar pull requests:', err);
        setPrError('Erro ao carregar PRs');
      } finally {
        setPrLoading(false);
      }
    };

    fetchPRs();
  }, []);

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredPRs = useMemo(
    () => filterByDateRange(prs, dateRange),
    [prs, dateRange],
  );

  const prStatCards = useMemo(() => buildStatCards(filteredPRs), [filteredPRs]);

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

  const handleInviteUser = async (userData: {
    nome: string;
    email: string;
    role: 'ADMIN' | 'USER';
    password?: string;
  }) => {
    try {
      const currentEditing = editingUserRef.current;

      if (currentEditing) {
        // Atualizar usuário existente
        const updateData = {
          username: userData.nome,
          email: userData.email,
          role: userData.role,
          ...(userData.password && { password: userData.password }),
        };
        const updatedUser = await usersService.update(currentEditing.id, updateData);
        setUsuarios((prev) =>
          prev.map((usuario) =>
            usuario.id === currentEditing.id
              ? mapUserToUsuarioAdmin(updatedUser)
              : usuario,
          ),
        );
        editingUserRef.current = undefined;
        setEditingUser(undefined);
      } else {
        // Criar novo usuário
        if (!userData.password) {
          setError('Senha é obrigatória para criar novo usuário');
          return;
        }
        const createData = {
          username: userData.nome,
          email: userData.email,
          password: userData.password,
          role: userData.role,
        };
        const newUser = await usersService.create(createData);
        setUsuarios((prev) => [...prev, mapUserToUsuarioAdmin(newUser)]);
      }
      setError(null);
    } catch (err) {
      console.error('Erro ao convidar/atualizar usuário:', err);
      setError('Erro ao processar usuário');
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUserId) return;

    try {
      await usersService.delete(deletingUserId);
      setUsuarios((prev) =>
        prev.filter((usuario) => usuario.id !== deletingUserId),
      );
      setDeletingUserId(undefined);
      setError(null);
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      setError('Erro ao deletar usuário');
    }
  };

  const openDeleteModal = (userId: number) => {
    setDeletingUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (usuario: UsuarioAdmin) => {
    editingUserRef.current = usuario;
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

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {adminStatCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ApiKeyCard />
            <IaConfigCard />
          </div>

          <section className="space-y-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Visão de Pull Requests
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Resultados do backend de PRs para o painel administrativo.
                </p>
              </div>
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {prStatCards.map((card) => (
                <StatCard key={card.title} {...card} />
              ))}
            </div>

            {prLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="text-muted-foreground">Carregando PRs...</div>
              </div>
            ) : prError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {prError}
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <PrChart prs={filteredPRs} dateRange={dateRange} />
                <RecentPRs prs={filteredPRs} />
              </div>
            )}
          </section>

          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-muted-foreground">Carregando usuários...</div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </main>
      </SidebarInset>

      {/* Modals */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => {
          editingUserRef.current = undefined;
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