import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/stat-card';
import { ApiKeyCard } from '@/components/layout/api-key-card';
import { IaConfigCard } from '@/components/layout/ia-config-card';
import { UsersTable } from '@/components/layout/users-table';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { adminStatCards, mockUsuarios } from '@/mocks/admin';

export function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(mockUsuarios.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <SidebarProvider>
      <AppSidebar activePath="/admin" />
      <SidebarInset>
        <main className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold text-foreground">
              Administração
            </h1>
          </div>

          <div className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 grid">
            {adminStatCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          <div className="grid-cols-1 xl:grid-cols-2 gap-4 grid">
            <ApiKeyCard />
            <IaConfigCard />
          </div>

          <div className="flex items-center justify-between">
            <Input placeholder="Filtro por nome/email" className="w-64" />
            <Button>+ Convidar Novo Usuário</Button>
          </div>

          <UsersTable usuarios={mockUsuarios} />

          <PaginationControls
            totalItems={mockUsuarios.length}
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
