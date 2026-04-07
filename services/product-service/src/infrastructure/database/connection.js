const mongoose = require('mongoose');
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

      logger.warn(`MongoDB connection failed, retrying in ${delay}ms...`, { error });
      setTimeout(() => connectWithRetry(retries - 1, delay), delay);
    });
};

module.exports = connectWithRetry;
