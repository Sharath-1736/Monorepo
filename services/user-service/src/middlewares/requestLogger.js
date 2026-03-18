const logger = require('@monorepo/logger');
module.exports = (req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.originalUrl,
    requestId: req.requestId,
    body: req.body,
  });
  next();
};
