import * as React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { RepositoriosTable } from '@/components/ui/repositorios-table';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { RepositorioFormModal } from '@/components/modals/repositorio-form-modal';
import { ConfirmDeleteModal } from '@/components/modals/confirm-delete-modal';
import { RepositorioHeader } from '@/components/layout/repositorio-header';
import { RepositorioSearchBar } from '@/components/layout/repositorio-search-bar';
import { useRepositorios } from '@/hooks/use-repositorios';
import type {
  Repository,
  CreateRepositoryDto,
  UpdateRepositoryDto,
} from '@/types/repository';

export function Repositorios() {
  const { repositorios, loading, create, update, remove } = useRepositorios();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [editingRepositorio, setEditingRepositorio] = React.useState<
    Repository | undefined
  >();
  const [deletingRepositorioId, setDeletingRepositorioId] = React.useState<
    string | undefined
  >();

  const filtered = repositorios.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <SidebarProvider>
      <AppSidebar activePath="/repositorios" />
      <SidebarInset>
        <main className="p-6 space-y-6">
          <RepositorioHeader />

          <RepositorioSearchBar
            value={searchTerm}
            onChange={(v) => {
              setSearchTerm(v);
              setCurrentPage(1);
            }}
            onAdd={() => setIsCreateOpen(true)}
          />

          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando repositórios...
            </p>
          ) : (
            <RepositoriosTable
              repositorios={paginated}
              onEdit={(r) => {
                setEditingRepositorio(r);
                setIsEditOpen(true);
              }}
              onDelete={(id) => {
                setDeletingRepositorioId(id);
                setIsDeleteOpen(true);
              }}
            />
          )}

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
        </main>
      </SidebarInset>

      <RepositorioFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(dto: CreateRepositoryDto) =>
          create(dto).then(() => setIsCreateOpen(false))
        }
      />

      <RepositorioFormModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingRepositorio(undefined);
        }}
        onSubmit={(dto: UpdateRepositoryDto) =>
          editingRepositorio &&
          update(editingRepositorio.id, dto).then(() => {
            setIsEditOpen(false);
            setEditingRepositorio(undefined);
          })
        }
        editingRepositorio={editingRepositorio}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingRepositorioId(undefined);
        }}
        onConfirm={() =>
          deletingRepositorioId &&
          remove(deletingRepositorioId).then(() => {
            setIsDeleteOpen(false);
            setDeletingRepositorioId(undefined);
          })
        }
        ruleTitle={
          repositorios.find((r) => r.id === deletingRepositorioId)?.name
        }
      />
    </SidebarProvider>
  );
}
