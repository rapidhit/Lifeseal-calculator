# ---- Build stage ----
FROM node:20-slim AS builder

# Install pnpm (same major version used in the workspace)
RUN npm install -g pnpm@10

WORKDIR /app

# Copy the entire workspace so pnpm can resolve all packages
COPY . .

# Install all workspace dependencies using the committed lockfile
RUN pnpm install --frozen-lockfile

# Build the frontend
# BASE_PATH=/ because Coolify serves the app at the root
# PORT is required by vite.config.ts at build time (not used at runtime for static serving)
ENV PORT=3000
ENV BASE_PATH=/
ENV NODE_ENV=production

RUN pnpm --filter @workspace/lifeseal-calculator run build

# ---- Serve stage ----
FROM nginx:stable-alpine

# Custom nginx config for SPA: all unknown routes → index.html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files
COPY --from=builder /app/artifacts/lifeseal-calculator/dist/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
