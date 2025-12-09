const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

// Middlewares
const requestLogger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");

// dotenv.config({ path: './.env' });
dotenv.config();

const app = express();

app.use(express.json());
app.use(requestLogger);
app.get("/", (req, res) => {
  res.send("Book Management API is running...");
});

// تركيب Express Router (Controlls)
// جميع المسارات ستبدأ بـ /api/v1/books
app.use("/api/v1/books", bookRoutes);

// استخدام معالج الأخطاء المخصص (Middleware) - يجب أن يكون في النهاية
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () =>
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

// التعامل مع الأخطاء غير المعالجة (Uncaught Exceptions)
process.on("unhandledRejection", (err, promise) => {
  logger.error(`Logged Error: ${err.message}`);
  // إغلاق الخادم والخروج من العملية
  server.close(() => process.exit(1));
});
