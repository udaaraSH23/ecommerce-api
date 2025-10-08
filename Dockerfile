# ----------------------------
# 1. Use official Node.js image
# ----------------------------
FROM node:20-alpine

# ----------------------------
# 2. Set working directory inside container
# ----------------------------
WORKDIR /usr/src/app

# ----------------------------
# 3. Copy package.json and package-lock.json first
#    (this helps with Docker layer caching)
# ----------------------------
COPY package*.json ./

# ----------------------------
# 4. Install only production dependencies
# ----------------------------
RUN npm install --production

# ----------------------------
# 5. Copy the rest of your backend code
# ----------------------------
COPY . .

# ----------------------------
# 6. Expose your app’s port (change if needed)
# ----------------------------
EXPOSE 3000

# ----------------------------
# 7. Start your backend
# ----------------------------
CMD ["node", "server.js"]
