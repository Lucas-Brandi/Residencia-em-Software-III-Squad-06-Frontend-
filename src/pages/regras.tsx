import * as React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { RulesTable } from '@/components/layout/rules-table';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { RuleFormModal } from '@/components/modals/rule-form-modal';
import { ConfirmDeleteModal } from '@/components/modals/confirm-delete-modal';
import { RegraHeader } from '@/components/layout/regra-header';
import { RegraSearchBar } from '@/components/layout/regra-search-bar';
import { useRegras } from '@/hooks/use-regras';
import type { Regra } from '@/types/rules';

export function Regras() {
  const { regras, loading, create, update, remove } = useRegras();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [editingRule, setEditingRule] = React.useState<Regra | undefined>();
  const [deletingRuleId, setDeletingRuleId] = React.useState<
    string | undefined
  >();

  const filtered = regras.filter((r) =>
    (r.titulo ?? '').toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <SidebarProvider>
      <AppSidebar activePath="/regras" />
      <SidebarInset>
        <main className="p-6 space-y-6">
          <RegraHeader />

          <RegraSearchBar
            value={searchTerm}
            onChange={(v) => {
              setSearchTerm(v);
              setCurrentPage(1);
            }}
            onAdd={() => setIsCreateOpen(true)}
          />

          {loading ? (
            <p className="text-sm text-muted-foreground">
              Carregando regras...
            </p>
          ) : (
            <RulesTable
              regras={paginated}
              onEdit={(r) => {
                setEditingRule(r);
                setIsEditOpen(true);
              }}
              onDelete={(id) => {
                setDeletingRuleId(id);
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

      <RuleFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(r) => create(r).then(() => setIsCreateOpen(false))}
      />

      <RuleFormModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingRule(undefined);
        }}
        onSubmit={(r) =>
          editingRule &&
          update(editingRule.id, r).then(() => {
            setIsEditOpen(false);
            setEditingRule(undefined);
          })
        }
        editingRule={editingRule}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingRuleId(undefined);
        }}
        onConfirm={() =>
          deletingRuleId &&
          remove(deletingRuleId).then(() => {
            setIsDeleteOpen(false);
            setDeletingRuleId(undefined);
          })
        }
        ruleTitle={regras.find((r) => r.id === deletingRuleId)?.titulo}
      />
    </SidebarProvider>
  );
}
