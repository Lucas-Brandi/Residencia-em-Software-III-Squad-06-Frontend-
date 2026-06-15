<div align="center">

# 🚀 Residência em Software III — Squad 06 (Frontend)

### Aplicação web front-end desenvolvida durante o Programa de Residência em Software III

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Tests-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)


</div>

---

## 📖 Sobre o projeto

Este repositório contém a **camada de front-end** desenvolvida pelo **Squad 06** durante o Programa de **Residência em Software III**. A aplicação foi construída com foco em **performance, escalabilidade e boas práticas de desenvolvimento**, utilizando um stack moderno baseado em **React 19**, **TypeScript** e **Vite**, com componentes de interface acessíveis (Radix UI / shadcn) e estilização utilitária com **Tailwind CSS**.

O projeto faz parte de um ecossistema maior (frontend + backend), sendo responsável por consumir a API do backend e entregar a experiência de usuário (UI/UX) da aplicação.

---

## 📑 Sumário

- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Como executar o projeto](#-como-executar-o-projeto)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Scripts disponíveis](#-scripts-disponíveis)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Qualidade de código](#-qualidade-de-código)
- [Testes](#-testes)
- [Executando com Docker](#-executando-com-docker)
- [Integração Contínua (CI)](#-integração-contínua-ci)
- [Equipe](#-equipe)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🛠️ Tecnologias utilizadas

### Core
| Tecnologia | Descrição |
|---|---|
| [React 19](https://react.dev/) | Biblioteca para construção de interfaces |
| [TypeScript](https://www.typescriptlang.org/) | Superset JavaScript com tipagem estática |
| [Vite](https://vitejs.dev/) | Build tool e servidor de desenvolvimento ultrarrápido |
| [React Router DOM](https://reactrouter.com/) | Roteamento de páginas (SPA) |

### UI / Estilização
| Tecnologia | Descrição |
|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | Framework CSS utilitário |
| [Radix UI](https://www.radix-ui.com/) / [shadcn](https://ui.shadcn.com/) | Componentes acessíveis e customizáveis |
| [Lucide React](https://lucide.dev/) | Ícones |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) / [class-variance-authority](https://cva.style/) | Composição e variantes de classes |
| [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) | Animações utilitárias |
| [Fontsource (Geist & Inter)](https://fontsource.org/) | Tipografia |

### Dados & Visualização
| Tecnologia | Descrição |
|---|---|
| [Recharts](https://recharts.org/) | Gráficos e dashboards |
| [React Day Picker](https://daypicker.dev/) | Seletor de datas |
| [date-fns](https://date-fns.org/) | Manipulação de datas |

### Qualidade & Testes
| Tecnologia | Descrição |
|---|---|
| [ESLint](https://eslint.org/) + [typescript-eslint](https://typescript-eslint.io/) | Padronização e análise estática de código |
| [Prettier](https://prettier.io/) | Formatação automática de código |
| [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) | Hooks de pré-commit |
| [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) | Testes unitários e de componentes |

### Infraestrutura
| Tecnologia | Descrição |
|---|---|
| [Docker](https://www.docker.com/) + [Nginx](https://nginx.org/) | Containerização e servidor de produção |
| [GitHub Actions](https://github.com/features/actions) | Pipeline de Integração Contínua (CI) |

---

## ✅ Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão **18 ou superior** recomendada)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- [Git](https://git-scm.com/)
- *(Opcional)* [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/), caso prefira executar via container

---

## ▶️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Lucas-Brandi/Residencia-em-Software-III-Squad-06-Frontend-.git
```

### 2. Acesse a pasta do projeto

```bash
cd Residencia-em-Software-III-Squad-06-Frontend-
```

### 3. Instale as dependências

```bash
npm install
```

> Ao instalar as dependências, o **Husky** será configurado automaticamente (via script `prepare`), habilitando os hooks de pré-commit (lint + format).

### 4. Configure as variáveis de ambiente

Crie (ou edite) o arquivo `.env` na raiz do projeto a partir do exemplo abaixo:

```env
VITE_API_URL=http://localhost:3000
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Após a inicialização, a aplicação estará disponível em:

```
http://localhost:5173
```

---

## 🔑 Variáveis de ambiente

Por ser construído com **Vite**, todas as variáveis de ambiente expostas ao cliente devem começar com o prefixo `VITE_`.

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_API_URL` | URL base da API do backend | `http://localhost:3000` |

> ⚠️ **Atenção:** nunca exponha chaves/secrets sensíveis em variáveis prefixadas com `VITE_`, pois elas ficam visíveis no bundle final do front-end.

---

## 📜 Scripts disponíveis

No diretório do projeto, você pode executar:

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera a build de produção (TypeScript + Vite) |
| `npm run preview` | Serve localmente a build de produção gerada |
| `npm run lint` | Executa o ESLint em todo o projeto |
| `npm run test` | Executa a suíte de testes com Vitest |

---

## 📂 Estrutura de pastas

```
Residencia-em-Software-III-Squad-06-Frontend-/
├── .github/
│   └── workflows/        # Pipelines de CI (GitHub Actions)
├── .husky/                # Hooks de pré-commit (lint-staged)
├── src/
│   ├── assets/            # Imagens, ícones e arquivos estáticos
│   ├── components/        # Componentes reutilizáveis (UI / shadcn)
│   ├── hooks/             # Hooks customizados
│   ├── pages/             # Páginas / rotas da aplicação
│   ├── routes/            # Configuração de rotas (React Router)
│   ├── services/          # Comunicação com a API (HTTP/fetch)
│   ├── types/             # Tipagens TypeScript
│   ├── utils/             # Funções utilitárias
│   └── main.tsx           # Ponto de entrada da aplicação
├── .dockerignore
├── .env
├── .prettierrc
├── Dockerfile             # Build da imagem Docker
├── eslint.config.js       # Configuração do ESLint
├── index.html
├── nginx.conf             # Configuração do Nginx (produção)
├── package.json
├── tailwind.config.ts     # Configuração do Tailwind CSS
├── tsconfig.json
└── vite.config.ts         # Configuração do Vite
```

> 💡 A estrutura da pasta `src/` pode variar conforme a evolução do projeto — utilize a árvore acima como referência geral.

---

## 🧹 Qualidade de código

Este projeto segue um conjunto de boas práticas para manter o código limpo e consistente:

- **ESLint** com `typescript-eslint`, `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh` para análise estática;
- **Prettier** integrado ao ESLint para formatação automática;
- **Husky + lint-staged**: antes de cada commit, os arquivos `.ts`/`.tsx` modificados são automaticamente formatados (`prettier --write`) e corrigidos (`eslint --fix`).

Para verificar o lint manualmente:

```bash
npm run lint
```

---

## 🧪 Testes

Os testes são escritos com **Vitest** + **Testing Library** (`@testing-library/react` e `@testing-library/jest-dom`), com ambiente simulado via **jsdom**.

Para executar a suíte de testes:

```bash
npm run test
```

---

## 🐳 Executando com Docker

A aplicação possui um `Dockerfile` configurado para gerar uma imagem otimizada, servindo os arquivos estáticos por meio do **Nginx**.

### 1. Build da imagem

```bash
docker build -t squad06-frontend .
```

### 2. Executar o container

```bash
docker run -p 8080:80 squad06-frontend
```

A aplicação ficará disponível em:

```
http://localhost:8080
```

---

## ⚙️ Integração Contínua (CI)

O projeto utiliza **GitHub Actions** (`.github/workflows`) para automatizar verificações a cada *push*/*pull request*, podendo incluir etapas como:

- ✅ Instalação de dependências
- ✅ Verificação de lint (ESLint)
- ✅ Execução dos testes (Vitest)
- ✅ Build de produção

---

## 👥 Equipe — Squad 06

| Integrante | Função |
|---|---|
| Lucas Brandi | Desenvolvedor(a) Front-end |
| _Adicione os demais membros do squad aqui_ | _Função_ |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir com o projeto:

1. Faça um **fork** do repositório
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b feature/minha-feature
   ```
3. Faça o commit das suas alterações:
   ```bash
   git commit -m "feat: minha nova feature"
   ```
4. Envie para o seu fork:
   ```bash
   git push origin feature/minha-feature
   ```
5. Abra um **Pull Request** descrevendo as mudanças realizadas

> 💡 Os hooks de pré-commit (Husky + lint-staged) ajudarão a manter o padrão de código durante o processo.

---

## 📄 Licença

Este projeto foi desenvolvido para fins **educacionais**, no contexto do **Programa de Residência em Software III**.
Caso deseje formalizar uma licença para o repositório, considere adicionar a licença [MIT](https://choosealicense.com/licenses/mit/) ou outra de sua preferência.

---

<div align="center">

Desenvolvido com 💙 pelo **Squad 06** — Residência em Software III

</div>
