# Architecture Overview

## Monorepo Structure
- `services/` holds independently deployable services
- `packages/` holds shared libraries
- `docs/` holds project documentation
- `scripts/` holds automation and scaffolding
- `docker-compose.yml` defines the local stack
- `package.json` defines root workspace scripts

## Current Runnable Baseline
- `services/user-service` is the verified HTTP service
- `user-db` is the MongoDB dependency used locally
- `npm run dev` runs the service locally and starts the database dependency
- `npm run docker:up` runs the current stack in containers

## Service Shape
Each service follows the same high-level structure:
- `src/api/` for routes, controllers, and validators
- `src/domain/` for models, repositories, and business services
- `src/infrastructure/` for database, observability, and external integrations
- `src/middlewares/` for service-specific middleware
- `src/config/` for service configuration
- `src/utils/` for helpers and probe handlers
- `src/app.js` for Express wiring
- `src/server.js` for HTTP startup and shutdown

## Shared Packages
- `@monorepo/config` loads and validates environment variables
- `@monorepo/logger` provides structured logging
- `@monorepo/errors` provides shared error types
- `@monorepo/middlewares` provides reusable middleware

## Adding Services
Use the scaffold script to add another service:

```sh
npm run create:service -- <service-name>
```
