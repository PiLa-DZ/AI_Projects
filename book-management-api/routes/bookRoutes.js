const express = require('express');
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

const router = express.Router(); // Express_Router

// استخدام Http Methods: GET, POST, PUT, DELETE
router.route('/')
  .get(getBooks)
  .post(createBook);

router.route('/:id') // استخدام Params: /api/v1/books/12345
  .put(updateBook)
  .delete(deleteBook);

module.exports = router;
