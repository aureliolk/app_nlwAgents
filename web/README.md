# Nlw Agents Alien - Frontend

Este projeto, a parte **frontend** do **Nlw Agents Alien**, foi desenvolvido por **aureliolk**. É uma aplicação web moderna construída com React e Vite, focada em uma experiência de usuário fluida e um desenvolvimento eficiente.

## Tecnologias Utilizadas

O projeto utiliza as seguintes bibliotecas e ferramentas principais:

*   **React**: Uma biblioteca JavaScript para construir interfaces de usuário.
*   **Vite**: Um bundler de próxima geração para desenvolvimento web, oferecendo uma experiência de desenvolvimento extremamente rápida.
*   **Tailwind CSS**: Um framework CSS utility-first para construir designs personalizados rapidamente.
*   **Shadcn UI**: Uma coleção de componentes de UI reutilizáveis e acessíveis, construídos com Radix UI e estilizados com Tailwind CSS.
*   **React Router DOM**: Uma biblioteca para roteamento declarativo em aplicações React.
*   **React Query (TanStack Query)**: Uma poderosa biblioteca para gerenciamento de estado do servidor, caching e sincronização de dados assíncronos.
*   **TypeScript**: Um superconjunto tipado de JavaScript que compila para JavaScript puro.
*   **Biome**: Uma ferramenta unificada para formatação e linting de código, garantindo consistência e qualidade do código.
*   **PNPM**: Um gerenciador de pacotes rápido e eficiente, que otimiza o uso de espaço em disco.

## Padrões de Projeto e Arquitetura

A arquitetura do projeto segue um padrão de componentes, comum em aplicações React, com as seguintes características:

*   **Componentes Reutilizáveis**: Utilização de componentes React e Shadcn UI para modularidade e reusabilidade.
*   **Roteamento Declarativo**: Gerenciamento de navegação entre páginas com React Router DOM.
*   **Gerenciamento de Estado do Servidor**: Uso de React Query para lidar com o estado assíncrono, caching e otimizações de requisições.
*   **Estilização Utility-First**: Aplicação de estilos com Tailwind CSS para um desenvolvimento ágil e consistente.

## Setup e Configuração do Projeto

Siga os passos abaixo para configurar e executar o projeto localmente:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

*   [Node.js](https://nodejs.org/en/) (versão compatível com as scripts do `package.json`)
*   [PNPM](https://pnpm.io/installation)

### 1. Instalação das Dependências

Navegue até a pasta `web/` e, com o PNPM, instale todas as dependências do projeto:

```bash
pnpm install
```

### 2. Executando a Aplicação

Você pode iniciar a aplicação em modo de desenvolvimento (com `watch` para recarregar automaticamente as alterações) ou construir para produção:

```bash
# Modo de Desenvolvimento
pnpm run dev

# Construir para Produção
pnpm run build

# Visualizar a build de Produção
pnpm run preview
```

A aplicação estará disponível em `http://localhost:5173` (ou na porta padrão do Vite, caso não haja conflito).