# Etapa 1: Construção do projeto
FROM node:18 AS builder

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos de dependências e instalar as dependências
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Compilar o projeto NestJS (transpilar TypeScript para JavaScript)
RUN npm run build

# Etapa 2: Criar uma imagem mais enxuta para rodar a aplicação
FROM node:18

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar apenas os arquivos necessários para a execução
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Definir a variável de ambiente que o NestJS usa para rodar a aplicação
ENV NODE_ENV=production

# Expor a porta do NestJS
EXPOSE 3001

# Rodar a aplicação
CMD ["npm", "run", "start:prod"]
