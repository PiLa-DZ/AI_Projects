book-management-api/
├── node_modules/
├── config/
│   └── db.js              # إعداد اتصال MongoDB
├── controllers/
│   └── bookController.js  # منطق الأعمال (CRUD)
├── middleware/
│   ├── errorHandler.js    # معالج أخطاء مخصص (Middleware)
│   └── logger.js          # لتسجيل الطلبات باستخدام Winston (Middleware)
├── models/
│   └── Book.js            # نموذج بيانات الكتاب (Mongoose Schema)
├── routes/
│   └── bookRoutes.js      # توجيه المسارات باستخدام Express Router
├── utils/
│   └── logger.js          # إعداد Winston
├── .env                   # المتغيرات البيئية (Dotenv)
├── .gitignore
├── server.js              # نقطة البداية للخادم (Create Server)
└── package.json
