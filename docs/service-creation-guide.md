# Service Creation and Onboarding Guide

This guide covers the current baseline for working in this monorepo and adding new services.

## Monorepo Overview
- `services/` contains application services
- `packages/` contains shared workspace packages
- `docs/` contains architecture and setup notes
- `scripts/` contains automation and scaffolding

## Creating a New Service
Run:

```sh
npm run create:service -- <service-name>
```

This creates `services/<service-name>/` with:
- `src/api/` for routes, controllers, and validators
- `src/domain/` for models, repositories, and business services
- `src/infrastructure/` for database, observability, and external integrations
- `src/middlewares/` for service-specific middleware
- `src/config/` for configuration loading
- `src/utils/` for helpers and probes
- `tests/` for service tests
- `Dockerfile`, `.env.example`, `openapi.json`, and `README.md`

## Environment Variables
Each service should provide an `.env.example` file and run from `.env.local`.

Typical values:

```env
SERVICE_NAME=user-service
PORT=3000
LOG_LEVEL=info
MONGO_URI=mongodb://localhost:27017/userdb
```

Shared config is loaded through `@monorepo/config`. Missing required values fail fast at startup.

## Running the Current Baseline
1. Run `npm run bootstrap`
2. Start the local verified path with `npm run dev`
3. Or start the containerized stack with `npm run docker:up`

The current repo baseline includes `user-service` and `user-db`.

## Shared Packages
- `@monorepo/config` for env loading and validation
- `@monorepo/logger` for structured logs
- `@monorepo/errors` for shared error types
- `@monorepo/middlewares` for reusable middleware

## Useful Commands
- `npm run bootstrap`
- `npm run dev`
- `npm run docker:up`
- `npm run docker:down`
- `npm run create:service -- <service-name>`
- `npm test`
