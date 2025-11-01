const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  logger.info(`Body: ${JSON.stringify(req.body)}`);
  next();
};

module.exports = requestLogger;
