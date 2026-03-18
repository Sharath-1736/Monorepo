const fs = require('fs');
const path = require('path');
const { repoRoot } = require('./_helpers');

function toPascalCase(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function toCamelCase(value) {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function pluralize(value) {
  if (value.endsWith('s')) {
    return value;
  }

  return `${value}s`;
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function buildTemplates(serviceName) {
  const resourceName = serviceName.replace(/-service$/, '') || serviceName;
  const resourceSlug = resourceName.toLowerCase();
  const resourceClass = toPascalCase(resourceSlug);
  const resourceVar = toCamelCase(resourceSlug);
  const collectionName = pluralize(resourceSlug);
  const serviceTitle = `${resourceClass} Service`;

  return {
    '.env.example': `SERVICE_NAME=${serviceName}
PORT=3000
LOG_LEVEL=info
MONGO_URI=mongodb://localhost:27017/${resourceSlug}db
`,
    'Dockerfile': `FROM node:20-alpine
WORKDIR /workspace

COPY package*.json ./
COPY packages/config/package.json packages/config/package.json
COPY packages/errors/package.json packages/errors/package.json
COPY packages/logger/package.json packages/logger/package.json
COPY packages/middlewares/package.json packages/middlewares/package.json
COPY packages/utils/package.json packages/utils/package.json
COPY services/${serviceName}/package.json services/${serviceName}/package.json

RUN npm install --workspaces --include-workspace-root --omit=dev

COPY packages packages
COPY services/${serviceName} services/${serviceName}

WORKDIR /workspace/services/${serviceName}
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
`,
    'README.md': `# ${serviceTitle}

## Purpose
Handles ${resourceSlug} APIs.

## Running Locally
1. Copy \`.env.example\` to \`.env.local\`
2. Run \`npm install\` from the monorepo root
3. Start with \`npm run start --workspace=${serviceName}\`
`,
    'openapi.json': `{
  "openapi": "3.0.0",
  "info": {
    "title": "${serviceTitle} API",
    "version": "1.0.0",
    "description": "API documentation for ${serviceTitle}"
  },
  "paths": {
    "/api/v1/${collectionName}/healthz": {
      "get": {
        "summary": "Health check",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  }
}
`,
    'package.json': `{
  "name": "${serviceName}",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node src/server.js",
    "test": "echo \\"add test runner\\""
  },
  "dependencies": {
    "@opentelemetry/api": "^1.9.0",
    "@monorepo/config": "1.0.0",
    "@monorepo/errors": "1.0.0",
    "@monorepo/logger": "1.0.0",
    "@monorepo/middlewares": "1.0.0",
    "express": "^4.21.2",
    "joi": "^17.13.3",
    "mongoose": "^7.8.7",
    "swagger-ui-express": "^5.0.1"
  }
}
`,
    [`src/api/controllers/${resourceName}Controller.js`]: `const ${resourceVar}Repository = require('../../domain/repositories/${resourceVar}Repository');

exports.list${pluralize(resourceClass)} = async (req, res, next) => {
  try {
    const items = await ${resourceVar}Repository.list();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.create${resourceClass} = async (req, res, next) => {
  try {
    const item = await ${resourceVar}Repository.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
`,
    'src/api/routes/docs.js': `const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../../openapi.json');

const router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
`,
    [`src/api/routes/${resourceName}Routes.js`]: `const express = require('express');
const readyCheck = require('../../utils/readyCheck');
const healthCheck = require('../../utils/healthCheck');
const controller = require('../controllers/${resourceName}Controller');
const { validateCreate${resourceClass} } = require('../validators/${resourceVar}Validator');

const router = express.Router();

router.get('/readyz', readyCheck);
router.get('/healthz', healthCheck);
router.get('/', controller.list${pluralize(resourceClass)});
router.post('/', validateCreate${resourceClass}, controller.create${resourceClass});

module.exports = router;
`,
    [`src/api/validators/${resourceName}Validator.js`]: `const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
});

exports.validateCreate${resourceClass} = (req, res, next) => {
  const { error } = createSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: {
        message: error.details[0].message,
        requestId: req.requestId,
      },
    });
    return;
  }

  next();
};
`,
    'src/app.js': `require('./infrastructure/observability/otel');
const express = require('express');
const correlationId = require('@monorepo/middlewares/correlationId');
const errorHandler = require('@monorepo/middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const routes = require('./api/routes/${resourceName}Routes');
const docsRoute = require('./api/routes/docs');

const app = express();

app.use(express.json());
app.use(correlationId);
app.use(requestLogger);
app.use('/api/v1/${collectionName}', routes);
app.use('/api/docs', docsRoute);
app.use(errorHandler);

module.exports = app;
`,
    'src/config/index.js': `module.exports = require('@monorepo/config');
`,
    [`src/domain/models/${resourceClass}.js`]: `const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('${resourceClass}', schema);
`,
    [`src/domain/repositories/${resourceName}Repository.js`]: `const ${resourceClass} = require('../models/${resourceClass}');

module.exports = {
  async list() {
    return ${resourceClass}.find().sort({ createdAt: -1 });
  },
  async create(payload) {
    return ${resourceClass}.create(payload);
  },
};
`,
    [`src/domain/services/${resourceName}Service.js`]: `module.exports = {};
`,
    'src/infrastructure/database/connection.js': `const mongoose = require('mongoose');
const logger = require('@monorepo/logger');
const config = require('../../config');

const connectWithRetry = (retries = 5, delay = 2000) => {
  mongoose.connect(config.MONGO_URI)
    .then(() => logger.info('MongoDB connected'))
    .catch((error) => {
      if (retries === 0) {
        logger.error('MongoDB connection failed, no retries left', { error });
        process.exit(1);
      }

      logger.warn(\`MongoDB connection failed, retrying in \${delay}ms...\`, { error });
      setTimeout(() => connectWithRetry(retries - 1, delay), delay);
    });
};

module.exports = connectWithRetry;
`,
    'src/infrastructure/external/eventConsumer.js': `class EventConsumer {
  async subscribe(eventType, handler) {
    console.log('[EventConsumer] Subscribed to event:', eventType);
    setTimeout(() => handler({ eventType, payload: { sample: true } }), 1000);
  }
}

module.exports = new EventConsumer();
`,
    'src/infrastructure/external/eventHandlers.js': `const eventConsumer = require('./eventConsumer');

function handleSampleEvent(event) {
  console.log('[EventHandler] Received event:', event);
}

eventConsumer.subscribe('${resourceClass}Created', handleSampleEvent);

module.exports = { handleSampleEvent };
`,
    'src/infrastructure/external/eventPublisher.js': `class EventPublisher {
  async publish(eventType, payload, options = {}) {
    console.log('[EventPublisher] Publishing event:', { eventType, payload, options });
  }
}

module.exports = new EventPublisher();
`,
    'src/infrastructure/observability/otel.js': `let tracer = {
  startSpan() {
    return {
      end() {},
    };
  },
};

try {
  const { trace } = require('@opentelemetry/api');
  tracer = trace.getTracer('${serviceName}');
} catch (error) {
  console.warn('[otel] OpenTelemetry disabled:', error.message);
}

module.exports = tracer;
`,
    'src/middlewares/requestLogger.js': `const logger = require('@monorepo/logger');

module.exports = (req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.originalUrl,
    requestId: req.requestId,
    body: req.body,
  });
  next();
};
`,
    'src/server.js': `const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const connectWithRetry = require('./infrastructure/database/connection');
const logger = require('@monorepo/logger');

require('./infrastructure/external/eventHandlers');

const server = http.createServer(app);
const port = config.PORT || 3000;

connectWithRetry();

server.listen(port, () => {
  logger.info('${serviceTitle} running on port ' + port);
});

function shutdown(signal) {
  logger.info(signal + ' received, shutting down gracefully');
  server.close(() => {
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
`,
    'src/utils/healthCheck.js': `module.exports = (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
};
`,
    'src/utils/readyCheck.js': `const mongoose = require('mongoose');

module.exports = async (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    ready,
    timestamp: new Date().toISOString(),
  });
};
`,
    [`tests/${resourceName}.test.js`]: `describe('${serviceTitle}', () => {
  it('needs real tests', () => {
    expect(true).toBe(true);
  });
});
`,
  };
}

function main() {
  const rawName = process.argv[2];
  if (!rawName) {
    console.error('Usage: npm run create:service -- <service-name>');
    process.exit(1);
  }

  const serviceName = rawName.endsWith('-service') ? rawName : `${rawName}-service`;
  const serviceRoot = path.join(repoRoot, 'services', serviceName);

  if (fs.existsSync(serviceRoot)) {
    console.error(`Service already exists: services/${serviceName}`);
    process.exit(1);
  }

  const resourceName = serviceName.replace(/-service$/, '');
  const templates = buildTemplates(serviceName);

  for (const [relativePath, content] of Object.entries(templates)) {
    writeFile(path.join(serviceRoot, relativePath), content);
  }

  console.log(`Created services/${serviceName}`);
  console.log(`Next steps:
1. Review services/${serviceName}/.env.example
2. Run npm install
3. Add ${serviceName} to docker-compose.yml if you want it in the local stack`);
}

main();
