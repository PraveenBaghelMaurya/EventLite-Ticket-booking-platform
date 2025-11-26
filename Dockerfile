# Stage 1: Build stage
FROM node:22.21.1-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:22.21.1-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install BOTH production AND required dev dependencies
RUN npm ci --only=production && \
    npm install jsonwebtoken

# Alternative: Install all dependencies that are required at runtime
# RUN npm ci --production --include=dev

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Create non-root user for security
RUN addgroup -g 1001 -S eventlitegroup
RUN adduser -S eventLiteDockerUser -u 1001

# Change ownership to non-root user
RUN chown -R eventLiteDockerUser:eventlitegroup /app

# Switch to non-root user
USER eventLiteDockerUser

EXPOSE 3000

CMD ["npm", "start"]