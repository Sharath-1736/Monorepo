# Local Setup Guide

## Prerequisites
- Node.js 20+
- Docker Desktop with Docker Compose
- Local MongoDB only if you do not want Docker to provide the database

## Steps
1. Clone the repository
2. Run `npm run bootstrap`
3. Start the local verified path with:
   ```sh
   npm run dev
   ```
4. Or start the containerized stack with:
   ```sh
   npm run docker:up
   ```

## What These Commands Do
- `npm run bootstrap` installs all workspace dependencies and creates `services/user-service/.env.local` if it is missing
- `npm run dev` starts `user-db` with Docker Compose and runs `user-service` locally on port `3000`
- `npm run docker:up` runs `user-service` and `user-db` in Docker Compose

## Endpoints
- Local dev: `http://localhost:3000/api/v1/users/healthz`
- Docker Compose: `http://localhost:3001/api/v1/users/healthz`

## Troubleshooting
- Make sure Docker Desktop is running before using `npm run dev` or `npm run docker:up`
- Check that ports `3000`, `3001`, and `27017` are available
- Review container logs with `docker compose logs`
