import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RulesTable } from '@/components/layout/rules-table';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { RuleFormModal } from '@/components/modals/rule-form-modal';
import { ConfirmDeleteModal } from '@/components/modals/confirm-delete-modal';
import { Regra } from '@/types/rules';

export function Regras() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [regras, setRegras] = useState<Regra[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Regra | undefined>();
  const [deletingRuleId, setDeletingRuleId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string>('');

  const repositoryId = "2a446e40-8422-4471-91fd-7d0f9faa59a9";

  useEffect(() => {
    fazerLoginFantasma();
  }, []);

  const fazerLoginFantasma = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: "john_doe",
          password: "SecurePass123"
        })
      });

      const data = await response.json();

      if (data.accessToken) {
        setToken(data.accessToken);
        fetchRules(data.accessToken);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchRules = async (currentToken: string = token) => {
    if (!currentToken) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/analysis-rules?repositoryId=${repositoryId}`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });

      if (response.ok) {
        const responseData = await response.json();

        let rawData = [];
        if (Array.isArray(responseData)) {
          rawData = responseData;
        } else if (responseData && Array.isArray(responseData.data)) {
          rawData = responseData.data;
        }

        const regrasFormatadas = rawData.map((item: any) => ({
          id: item.id,
          titulo: item.content || 'Sem título',
          categoria: item.ruleType || 'Estilo',
          gravidade: item.severity || 'Aviso', 
          status: item.isActive !== false ? 'Ativo' : 'Inativo',
        }));

        setRegras(regrasFormatadas);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRegras = regras.filter((regra) =>
    (regra.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()),
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

  const handleCreateRule = async (newRule: any) => {
    try {
      const payload = {
        repositoryId: repositoryId,
        ruleType: newRule.categoria,
        content: newRule.titulo,
        severity: newRule.gravidade,
        isActive: newRule.status === 'Ativo' || newRule.status === true,
        createdById: 1
      };

      console.log("Enviando para Criar:", payload); 

      const response = await fetch(`${import.meta.env.VITE_API_URL}/analysis-rules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        fetchRules();
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditRule = async (updatedRule: any) => {
    if (!editingRule) return;
    try {
      const payload = {
        repositoryId: repositoryId,
        ruleType: updatedRule.categoria,
        content: updatedRule.titulo,
        severity: updatedRule.gravidade,
        isActive: updatedRule.status === 'Ativo' || updatedRule.status === true,
        createdById: 1
      };

      console.log("Enviando para Editar:", payload);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/analysis-rules/${editingRule.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        fetchRules();
        setIsEditModalOpen(false);
        setEditingRule(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRule = async () => {
    if (!deletingRuleId) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/analysis-rules/${deletingRuleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchRules();
        setIsDeleteModalOpen(false);
        setDeletingRuleId(undefined);
      }
    } catch (error) {
      console.error(error);
    }
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

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando regras...</p>
          ) : (
             <RulesTable
               regras={paginatedRegras}
               onEdit={openEditModal}
               onDelete={openDeleteModal}
             />
          )}

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
