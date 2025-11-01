const logger = require('../utils/logger');

// دالة معالجة الأخطاء يجب أن تحتوي على 4 وسائط: (err, req, res, next)
const errorHandler = (err, req, res, next) => {
  logger.error(err.stack); // تسجيل الخطأ كاملاً

  // يمكن تخصيص رسائل الأخطاء بناءً على نوعها (مثل أخطاء Mongoose)
  let error = { ...err };
  error.message = err.message;

  // مثال: خطأ Mongoose: ObjectId غير صحيح
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = { statusCode: 404, message: message };
  }
  
  // مثال: خطأ Mongoose: مفتاح فريد مكرر
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { statusCode: 400, message: message };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
