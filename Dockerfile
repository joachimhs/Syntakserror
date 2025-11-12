# ---- Stage 1: Install all dependencies ----
# Using a slim Alpine image for a smaller base size.
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
# Use 'ci' for reproducible builds in CI/CD environments
RUN npm ci

# ---- Stage 2: Development Stage ----
# This stage is used for local development with hot-reloading.
FROM dependencies AS development
WORKDIR /app
# Copy the installed node_modules from the first stage
COPY --from=dependencies /app/node_modules ./node_modules
# Copy the rest of the application source code
COPY . .
# Expose the Vite port
EXPOSE 5174
# The '--host' flag is CRUCIAL to expose the server outside the container
CMD ["npm", "run", "dev", "--", "--host"]


# ---- Stage 3: Build Stage ----
# This stage builds the production-ready application.
FROM dependencies AS builder
WORKDIR /app
COPY . .
# Build the SvelteKit Node.js server
RUN npm run build

# ---- Stage 4: Production Stage ----
# This is the final, optimized image that will be pushed to Nexus.
FROM node:20-alpine AS production
WORKDIR /app

# Install ONLY production dependencies to keep the image small
COPY --from=development /app/package.json /app/package.json
COPY --from=builder /app/build /app/build
COPY --from=development /app/.svelte-kit /app/.svelte-kit
COPY --from=development /app/static /app/static
RUN npm install --omit=dev

# Copy the built application from the 'builder' stage
COPY --from=builder /app/build ./build

# SvelteKit's Node adapter listens on 0.0.0.0 by default,
# but we set the port explicitly for clarity.
ENV PORT=3000
EXPOSE 3000

# The command to start the production server
CMD ["node", "/app/build"]