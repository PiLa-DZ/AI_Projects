const Book = require('../models/Book');
const logger = require('../utils/logger');

// @desc    الحصول على جميع الكتب (Read All)
// @route   GET /api/v1/books
// @access  Public
exports.getBooks = async (req, res, next) => {
  try {
    // مثال لاستخدام Query: /api/v1/books?author=...
    const books = await Book.find(req.query); 
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    logger.error(`Error getting books: ${error.message}`);
    next(error); // تمرير الخطأ إلى معالج الأخطاء
  }
};

// @desc    إنشاء كتاب جديد (Create)
// @route   POST /api/v1/books
// @access  Public
exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    logger.error(`Error creating book: ${error.message}`);
    next(error);
  }
};

// @desc    تحديث كتاب باستخدام الـ ID (Update)
// @route   PUT /api/v1/books/:id
// @access  Public
exports.updateBook = async (req, res, next) => {
  try {
    // مثال لاستخدام Params: req.params.id
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, msg: 'Book not found' });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // لإرجاع النسخة المحدثة
      runValidators: true,
    });

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    logger.error(`Error updating book: ${error.message}`);
    next(error);
  }
};

// @desc    حذف كتاب (Delete)
// @route   DELETE /api/v1/books/:id
// @access  Public
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, msg: 'Book not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    logger.error(`Error deleting book: ${error.message}`);
    next(error);
  }
};
