require('./infrastructure/observability/otel');
const express = require('express');
const correlationId = require('@monorepo/middlewares/correlationId');
const errorHandler = require('@monorepo/middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const routes = require('./api/routes/courseRoutes');
const docsRoute = require('./api/routes/docs');

const app = express();

app.use(express.json());
app.use(correlationId);
app.use(requestLogger);
app.use('/api/v1/courses', routes);
app.use('/api/docs', docsRoute);
app.use(errorHandler);

module.exports = app;
