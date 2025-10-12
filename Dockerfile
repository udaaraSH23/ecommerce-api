# ----------------------------
# 1 Build stage: use Node.js official image
# ----------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# ----------------------------
# 2 Production stage: use lighter Node.js runtime
# ----------------------------
FROM node:20-alpine

WORKDIR /app

# Copy only needed files from build stage
COPY --from=builder /app .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
