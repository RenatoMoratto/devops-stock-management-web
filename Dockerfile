# React config
FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY ..
RUN yarn build

# Nginx config
FROM nginx:1.21.0-alpine AS production
# Add a non-root user
RUN adduser -D jenkins
# Change to non-root user
USER jenkins
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
CMD ["nginx", "-g", "daemon off;"]