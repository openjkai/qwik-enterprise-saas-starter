# qwik-enterprise-saas-starter

Production-ready monorepo for enterprise SaaS: **Qwik** frontend + **NestJS** backend + shared packages.

## Architecture

```
qwik-enterprise-saas-starter/
├── apps/
│   ├── web/          → Qwik City (SSR, Tailwind, shadcn-like UI)
│   └── api/          → NestJS (Prisma, JWT auth, RBAC)
├── packages/
│   └── shared/       → DTOs, Zod schemas (zod/v4)
├── docker-compose.yml
└── pnpm-workspace.yaml
```

## Prerequisites

- **Node.js** 20+
- **pnpm** 9+
- **Docker** (for Postgres, Redis)

## Quick Start

```bash
# Install dependencies
pnpm install

# Start infrastructure (Postgres, Redis)
docker compose up -d

# Build shared package first
pnpm run build:shared

# Run API (terminal 1)
pnpm run dev:api

# Run Web (terminal 2)
pnpm run dev:web
```

- **API:** http://localhost:3000  
- **Web:** http://localhost:5173  

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev:api` | Start NestJS API (watch mode) |
| `pnpm run dev:web` | Start Qwik dev server |
| `pnpm run build` | Build all packages |
| `pnpm run build:shared` | Build shared package only |
| `pnpm run format` | Format code with Prettier |
| `pnpm run setup:git` | Enable conventional commit template |

## Docker

```bash
# Start all services (Postgres, Redis, API, Web)
docker compose up -d
```

## Environment

Copy `apps/api/.env.example` to `apps/api/.env` and configure:

- `DATABASE_URL` — Postgres connection string
- `JWT_SECRET` — Secret for JWT signing
- `REDIS_URL` — Redis connection (optional)

For the web app, copy `apps/web/.env.example` to `apps/web/.env` and set `VITE_API_URL` (default: `http://localhost:3000`).

## Features

- **Auth:** JWT login/register, protected routes, role-based access (OWNER, ADMIN, MEMBER)
- **Database:** Prisma + PostgreSQL, multi-tenant schema
- **Frontend:** Qwik City, Tailwind, shadcn-like design
- **Shared:** Zod v4 schemas (`zod/v4`) for validation across API and web

## License

MIT — see [LICENSE](./LICENSE)
