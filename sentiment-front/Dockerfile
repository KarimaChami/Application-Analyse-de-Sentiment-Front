# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build the Next.js app
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app


# Only copy necessary build output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only prod dependencies
RUN npm install --omit=dev
# Expose port 3000
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "start"]