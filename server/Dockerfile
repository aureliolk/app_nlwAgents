# Dockerfile para produção com Node.js 22
FROM node:22-alpine AS dependencies

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat curl

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar apenas dependências de produção
RUN pnpm install --frozen-lockfile --prod

# Stage 2: Build da aplicação
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar todas as dependências (dev + prod)
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Stage 3: Runtime
FROM node:22-alpine AS runtime

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copiar dependências de produção
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copiar código da aplicação
COPY --chown=nextjs:nodejs . .

# Mudar para usuário não-root
USER nextjs

# Expor porta
EXPOSE 3333

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3333

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3333/health || exit 1

# Comando de inicialização para PRODUÇÃO
CMD ["pnpm", "dev"]