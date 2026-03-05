FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps ./apps
COPY packages ./packages

RUN corepack enable pnpm && pnpm install --frozen-lockfile

WORKDIR /app/apps/web
EXPOSE 5173

# Dev server - bind to 0.0.0.0 for Docker
CMD ["pnpm", "dev", "--", "--host", "0.0.0.0"]
