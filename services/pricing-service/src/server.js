const http = require('http');
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
  logger.info('Pricing Service running on port ' + port);
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
