# Docker 部署配置

# 多阶段构建
# 阶段1: 构建前端
FROM node:20-alpine AS builder-web

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build:web

# 阶段2: 构建后端
FROM node:20-alpine AS builder-server

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build:server

# 阶段3: 运行应用
FROM node:20-alpine

WORKDIR /app
COPY --from=builder-server /app/server ./server
COPY --from=builder-server /app/node_modules ./node_modules
COPY --from=builder-server /app/package.json ./
COPY --from=builder-web /app/dist-web ./dist-web

EXPOSE 3000
EXPOSE 5000

CMD ["node", "server/dist/main.js"]
