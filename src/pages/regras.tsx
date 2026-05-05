import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RulesTable } from '@/components/layout/rules-table';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { RuleFormModal } from '@/components/modals/rule-form-modal';
import { ConfirmDeleteModal } from '@/components/modals/confirm-delete-modal';
import { mockRegras } from '@/mocks/rules';
import { Regra } from '@/types/rules';

export function Regras() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [regras, setRegras] = useState(mockRegras);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Regra | undefined>();
  const [deletingRuleId, setDeletingRuleId] = useState<string | undefined>();

  const filteredRegras = regras.filter((regra) =>
    regra.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredRegras.length / itemsPerPage);
  const paginatedRegras = filteredRegras.slice(
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

  const handleCreateRule = (newRule: Omit<Regra, 'id'>) => {
    const newId = `#${regras.length + 1}`;
    const rule: Regra = {
      ...newRule,
      id: newId,
    };
    setRegras((prev) => [...prev, rule]);
  };

  const handleEditRule = (updatedRule: Omit<Regra, 'id'>) => {
    if (!editingRule) return;

    setRegras((prev) =>
      prev.map((regra) =>
        regra.id === editingRule.id ? { ...regra, ...updatedRule } : regra,
      ),
    );
    setEditingRule(undefined);
  };

  const handleDeleteRule = () => {
    if (!deletingRuleId) return;

    setRegras((prev) => prev.filter((regra) => regra.id !== deletingRuleId));
    setDeletingRuleId(undefined);
  };

  const openEditModal = (regra: Regra) => {
    setEditingRule(regra);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (regraId: string) => {
    setDeletingRuleId(regraId);
    setIsDeleteModalOpen(true);
  };

  return (
    <SidebarProvider>
      <AppSidebar activePath="/regras" />
      <SidebarInset>
        <main className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Regras</h1>
              <p className="text-sm text-muted-foreground">
                Defina e gerencie os critérios de avaliação de Pull Requests.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Input
              placeholder="Pesquisar"
              className="w-64"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Adicionar Nova Regra
            </Button>
          </div>

          <RulesTable
            regras={paginatedRegras}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />

          <PaginationControls
            totalItems={filteredRegras.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </main>
      </SidebarInset>

      {/* Modals */}
      <RuleFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRule}
      />

      <RuleFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRule(undefined);
        }}
        onSubmit={handleEditRule}
        editingRule={editingRule}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingRuleId(undefined);
        }}
        onConfirm={handleDeleteRule}
        ruleTitle={regras.find((r) => r.id === deletingRuleId)?.titulo}
      />
    </SidebarProvider>
  );
}
