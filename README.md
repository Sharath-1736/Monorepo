# Node.js Microservices Monorepo

## Overview
This repository is a Node.js microservices monorepo with shared workspace packages for config, logging, errors, and middleware.

The current verified runnable baseline is:
- `user-service`
- `user-db` (MongoDB)

## Structure
- `services/` contains individual services
- `packages/` contains shared workspace packages
- `docs/` contains architecture and onboarding notes
- `scripts/` contains repo automation and scaffolding
- `docker-compose.yml` runs the local stack
- `package.json` defines root workspace scripts

## Quick Start
1. Run `npm run bootstrap`
2. Start the local verified path with `npm run dev`
3. Or start the containerized stack with `npm run docker:up`

## Available Scripts
- `npm run bootstrap` installs workspace dependencies and creates `services/user-service/.env.local` if it is missing
- `npm run dev` starts MongoDB with Docker Compose and runs `user-service` locally on port `3000`
- `npm run docker:up` runs the current stack in Docker Compose
- `npm run docker:down` stops the Docker Compose stack
- `npm run create:service -- <service-name>` scaffolds a new service from the current baseline

## Endpoints
- Local dev: `http://localhost:3000/api/v1/users/healthz`
- Docker Compose: `http://localhost:3001/api/v1/users/healthz`

See `docs/` for more detail.
