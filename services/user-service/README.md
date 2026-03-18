# User Service

## Purpose
Handles user management, registration, and profile APIs.

## Structure
- `src/api/` – Routes, controllers, validators
- `src/domain/` – Models, repositories, business logic
- `src/infrastructure/` – Database and external integrations
- `src/middlewares/` – Service-specific middlewares
- `src/config/` – Config loader
- `src/utils/` – Utilities
- `app.js` – Express app setup
- `server.js` – HTTP server, graceful shutdown

## Environment Variables
See `.env.example` for required variables.

## Running Locally
1. Copy `.env.example` to `.env.local` and fill in values
2. Run `npm install`
3. Start with `npm start` or via Docker

## Deployment
- Build Docker image and deploy via orchestrator

## Scaling
- Stateless, horizontally scalable

---
