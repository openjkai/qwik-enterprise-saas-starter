# qwik-enterprise-saas-starter

Production-ready monorepo: Qwik frontend + NestJS backend + shared packages.

## Setup

```bash
pnpm install
pnpm setup:git   # Optional: use conventional commit template (feat:, chore:, etc.)
```

## Docker

Start all services (Postgres, Redis, API, Web):

```bash
docker compose up -d
```

- API: http://localhost:3000
- Web: http://localhost:5173

See [ROADMAP.md](./ROADMAP.md) for step-by-step development plan.
