FROM node:20-alpine
WORKDIR /workspace

COPY package*.json ./
COPY packages/config/package.json packages/config/package.json
COPY packages/errors/package.json packages/errors/package.json
COPY packages/logger/package.json packages/logger/package.json
COPY packages/middlewares/package.json packages/middlewares/package.json
COPY packages/utils/package.json packages/utils/package.json
COPY services/product-service/package.json services/product-service/package.json

RUN npm install --workspaces --include-workspace-root --omit=dev

COPY packages packages
COPY services/product-service services/product-service

WORKDIR /workspace/services/product-service
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
