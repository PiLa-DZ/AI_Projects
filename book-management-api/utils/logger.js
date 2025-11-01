const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // تسجيل الأخطاء (Error) في ملف منفصل
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // تسجيل جميع مستويات 'info' وما فوق في ملف آخر
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// إذا كنا في وضع التطوير، قم أيضاً بالتسجيل على Console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
