FROM node:20-alpine

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm ci --omit=dev

# Copia código
COPY src ./src

# Cria diretório de dados (se realmente precisar)
RUN mkdir -p /data

# Segurança: roda como usuário não-root
USER node

EXPOSE 4000

CMD ["node", "src/index.js"]
