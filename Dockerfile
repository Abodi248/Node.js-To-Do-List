FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
ENV HOST 0.0.0.0
ENV PORT 3000

# Install wget for healthcheck
RUN apk add --no-cache wget

CMD ["npm", "start"]

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=10 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1
