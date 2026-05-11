import { Regra } from '@/types/rules';

export const mockRegras: Regra[] = [
  {
    id: '#01',
    titulo: 'Senhas e chaves de API não devem ser expostas',
    categoria: 'Segurança',
    gravidade: 'Crítico',
    status: 'Ativo',
  },
  {
    id: '#02',
    titulo: 'Evitar uso de console.log em produção',
    categoria: 'Qualidade',
    gravidade: 'Aviso',
    status: 'Ativo',
  },
  {
    id: '#03',
    titulo: 'Funções devem ter no máximo 20 linhas',
    categoria: 'Estilo',
    gravidade: 'Dica',
    status: 'Inativo',
  },
  {
    id: '#04',
    titulo: 'Validar inputs de usuário',
    categoria: 'Segurança',
    gravidade: 'Crítico',
    status: 'Ativo',
  },
  {
    id: '#05',
    titulo: 'Usar async/await em vez de Promise chains',
    categoria: 'Lógica',
    gravidade: 'Dica',
    status: 'Ativo',
  },
  {
    id: '#06',
    titulo: 'Evitar código duplicado',
    categoria: 'Arquitetura',
    gravidade: 'Aviso',
    status: 'Ativo',
  },
  {
    id: '#07',
    titulo: 'Otimizar queries de banco de dados',
    categoria: 'Performance',
    gravidade: 'Aviso',
    status: 'Inativo',
  },
  {
    id: '#08',
    titulo: 'Components React devem ter PropTypes',
    categoria: 'Frontend',
    gravidade: 'Dica',
    status: 'Ativo',
  },
  {
    id: '#09',
    titulo: 'Implementar tratamento de erros',
    categoria: 'Qualidade',
    gravidade: 'Crítico',
    status: 'Ativo',
  },
  {
    id: '#010',
    titulo: 'Usar lazy loading para imagens',
    categoria: 'Performance',
    gravidade: 'Dica',
    status: 'Inativo',
  },
];
