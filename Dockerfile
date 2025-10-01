# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY src/ ./src/
COPY public/ ./public/
COPY index.js ./
COPY jest.config.cjs ./


FROM node:18-alpine AS production

WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app ./
EXPOSE 3000

CMD ["node", "index.js"]

