# Use uma imagem base Node.js leve
FROM node:22-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instale pnpm globalmente
RUN npm install -g pnpm

# Copie os arquivos de configuração do projeto e instale as dependências
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

# Copie o restante do código-fonte
COPY . .

# Exponha a porta que a aplicação irá escutar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["pnpm", "dev"]