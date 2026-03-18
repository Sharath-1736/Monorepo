// Initialize OpenTelemetry tracing (must be first)
require('./infrastructure/observability/otel');
const express = require('express');
const correlationId = require('@monorepo/middlewares/correlationId');
const errorHandler = require('@monorepo/middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');

const userRoutesV1 = require('./api/routes/userRoutes');
// For demonstration, v2 can reuse v1 or have its own implementation
const userRoutesV2 = require('./api/routes/userRoutes');
const docsRoute = require('./api/routes/docs');

const app = express();
app.use(express.json());
app.use(correlationId);
app.use(requestLogger);
app.use('/api/v1/users', userRoutesV1);
app.use('/api/v2/users', userRoutesV2); // Future: implement v2 routes separately
app.use('/api/docs', docsRoute);
app.use(errorHandler);

module.exports = app;
