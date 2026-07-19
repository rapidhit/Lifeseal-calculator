# ---- Build stage ----
FROM node:20-slim AS builder

# Install pnpm (same major version used in the workspace)
RUN npm install -g pnpm@10

WORKDIR /app

# 1) Copy ONLY the dependency manifests first. This layer — and the heavy
#    package download below — stays cached between deploys and only re-runs
#    when the lockfile actually changes. Code-only pushes skip it entirely.
COPY pnpm-lock.yaml pnpm-workspace.yaml ./

# Pre-download every package into the pnpm store using just the lockfile.
# Low network concurrency keeps memory/network pressure gentle on small servers.
RUN pnpm fetch --network-concurrency 4

# 2) Now copy the workspace and link dependencies from the local store
#    (no re-download; falls back to network only if something is missing).
COPY . .
RUN pnpm install --frozen-lockfile --prefer-offline

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
