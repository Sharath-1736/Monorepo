const logger = require('@monorepo/logger');
module.exports = (err, req, res, next) => {
  logger.error('Unhandled error', { requestId: req.requestId, error: err });
  const status = err.statusCode || 500;
  res.status(status).json({
    error: {
      message: err.message,
      details: err.details || {},
      requestId: req.requestId,
    }
  });
};
