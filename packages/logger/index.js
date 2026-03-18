const { createLogger, format, transports } = require('winston');
const { v4: uuidv4 } = require('uuid');

const serviceName = process.env.SERVICE_NAME || 'unknown-service';

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return JSON.stringify({
        timestamp,
        level,
        service: serviceName,
        requestId: meta.requestId || uuidv4(),
        message,
        ...meta,
      });
    })
  ),
  transports: [
    new transports.Console(),
    ...(process.env.NODE_ENV === 'production'
      ? [new transports.File({ filename: 'logs/app.log' })]
      : []),
  ],
});

module.exports = logger;
