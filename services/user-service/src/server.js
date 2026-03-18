const http = require('http');
const app = require('./app');
const config = require('./config');
const connectWithRetry = require('./infrastructure/database/connection');
const logger = require('@monorepo/logger');


// Initialize event handlers (future: real event bus)
require('./infrastructure/external/eventHandlers');

const server = http.createServer(app);
const PORT = config.PORT || 3000;

connectWithRetry();

server.listen(PORT, () => {
  logger.info(`User Service running on port ${PORT}`);
});


const mongoose = require('mongoose');

const shutdown = (signal) => {
  logger.info(`${signal} received, shutting down gracefully`);
  server.close(() => {
    logger.info('HTTP server closed');
    mongoose.connection.close(false, () => {
      logger.info('MongoDB connection closed');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
