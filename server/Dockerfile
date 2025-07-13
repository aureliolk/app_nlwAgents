# Dockerfile.production - Para builds de produção
FROM node:20-alpine AS dependencies

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar apenas dependências de produção
RUN pnpm install --frozen-lockfile --prod

# Stage 2: Build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar todas as dependências (dev + prod)
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação (se necessário)
# RUN pnpm run build

# Stage 3: Runtime
FROM node:20-alpine AS runtime

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

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
  CMD node --eval "fetch('http://localhost:3333/health').then(() => process.exit(0)).catch(() => process.exit(1))" || exit 1

# Comando de inicialização
CMD ["pnpm", "dev"]