# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
# Ensure Node listens on all interfaces
ENV HOST 0.0.0.0
ENV PORT 3000

# Start the app
CMD ["npm", "start"]

# Health check on /health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=5 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

