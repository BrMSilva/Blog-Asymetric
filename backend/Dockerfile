FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src

# Criar a pasta data e dar permissão ao usuário node antes de mudar o USER
USER root
RUN mkdir -p /data && chown -R node:node /data && chmod 777 /data

USER node
EXPOSE 4000
CMD ["node", "src/index.js"]
