# React config
FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

# Nginx config
FROM nginx:1.21.0-alpine AS production
# Adicionar um usuário não-root
ENV NODE_ENV production
# Copiar os assets construídos da imagem `builder`
COPY --from=builder /app/dist /usr/share/nginx/html
# Adicionar o arquivo nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expor a porta
EXPOSE 3000
# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]