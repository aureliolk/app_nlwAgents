# Nlw Agents Alien - Backend

Este projeto, a parte **backend** do **Nlw Agents Alien**, foi desenvolvido por **aureliolk**. É uma aplicação backend construída com foco em performance e tipagem segura.

## Tecnologias Utilizadas

O projeto utiliza as seguintes bibliotecas e ferramentas principais:

*   **Fastify**: Um framework web rápido e de baixo overhead para Node.js, focado em fornecer a melhor experiência de desenvolvedor com plugins poderosos.
*   **Zod**: Uma biblioteca de declaração e validação de esquemas TypeScript-first, garantindo a segurança de tipo em tempo de execução.
*   **Drizzle ORM**: Um ORM (Object-Relational Mapper) moderno e tipado para TypeScript, utilizado para interagir com o banco de dados PostgreSQL.
*   **PostgreSQL**: Um sistema de gerenciamento de banco de dados relacional de código aberto e robusto.
*   **TypeScript**: Um superconjunto tipado de JavaScript que compila para JavaScript puro.
*   **Biome**: Uma ferramenta unificada para formatação e linting de código, garantindo consistência e qualidade do código.
*   **PNPM**: Um gerenciador de pacotes rápido e eficiente, que otimiza o uso de espaço em disco.
*   **Docker**: Utilizado para orquestrar o ambiente de banco de dados, garantindo um setup consistente.

## Padrões de Projeto e Arquitetura

A arquitetura do projeto segue um padrão modular, com a separação de responsabilidades em diferentes camadas:

*   **Rotas HTTP**: Definidas usando Fastify, com validação de esquema via Zod para garantir a integridade dos dados de entrada.
*   **Camada de Banco de Dados**: Interação com o PostgreSQL através do Drizzle ORM, com esquemas de banco de dados definidos e gerenciados por migrações.
*   **Variáveis de Ambiente**: Gerenciadas através de um arquivo `.env` para configuração flexível do ambiente.

## Setup e Configuração do Projeto

Siga os passos abaixo para configurar e executar o projeto localmente:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

*   [Node.js](https://nodejs.org/en/) (versão compatível com as scripts do `package.json`)
*   [PNPM](https://pnpm.io/installation)
*   [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto `server/` com as seguintes variáveis:

```
SERVER_URL=http://localhost
PORT=3333

# Database
DATABASE_URL=postgres://aureliolk:lkb3t4kayn@localhost:5432/nlw_agents
```

**Nota**: A `DATABASE_URL` deve corresponder às configurações do seu banco de dados PostgreSQL. As credenciais fornecidas são para o setup padrão do Docker Compose.

### 2. Configuração do Banco de Dados com Docker Compose

O projeto utiliza Docker Compose para configurar o banco de dados PostgreSQL. Navegue até a pasta `server/` e execute o seguinte comando para iniciar o serviço do banco de dados:

```bash
docker-compose up -d
```

Este comando irá iniciar um contêiner PostgreSQL com a imagem `pgvector/pgvector:pg17` e configurar o banco de dados `nlw_agents` com as credenciais especificadas no `.env` e `docker-compose.yml`.

### 3. Instalação das Dependências

Com o PNPM, instale todas as dependências do projeto:

```bash
pnpm install
```

### 4. Migrações e Seed do Banco de Dados

Após a instalação das dependências, execute as migrações do banco de dados para criar as tabelas necessárias e, opcionalmente, o seed para popular o banco de dados com dados iniciais:

```bash
# Executar migrações (se houver)
pnpm drizzle-kit push:pg

# Executar seed (para dados iniciais)
pnpm run db:seed
```

### 5. Executando a Aplicação

Você pode iniciar a aplicação em modo de desenvolvimento (com `watch` para recarregar automaticamente as alterações) ou em modo de produção:

```bash
# Modo de Desenvolvimento
pnpm run dev

# Modo de Produção
pnpm start
```

A aplicação estará disponível em `http://localhost:3333` (ou na porta configurada no seu arquivo `.env`).