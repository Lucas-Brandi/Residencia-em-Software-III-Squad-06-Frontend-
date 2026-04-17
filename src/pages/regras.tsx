import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RulesTable } from '@/components/layout/rules-table';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { mockRegras } from '@/mocks/rules';

export function Regras() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(mockRegras.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <SidebarProvider>
      <AppSidebar activePath="/regras" />
      <SidebarInset>
        <main className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Regras do Repositório
              </h1>
              <p className="text-sm text-muted-foreground">
                Defina e gerencie os critérios de avaliação de Pull Requests.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Input placeholder="Filtro por título" className="w-64" />
            <Button>+ Adicionar Nova Regra</Button>
          </div>

          <RulesTable regras={mockRegras} />

          <PaginationControls
            totalItems={mockRegras.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
