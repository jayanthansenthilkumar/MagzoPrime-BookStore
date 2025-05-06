const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  getTopBooks,
} = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.route('/').get(getBooks);
router.get('/top', getTopBooks);
router.route('/:id').get(getBookById);

// Private routes
router.route('/:id/reviews').post(protect, createBookReview);

// Admin routes
router.route('/')
  .post(protect, admin, createBook);

router.route('/:id')
  .delete(protect, admin, deleteBook)
  .put(protect, admin, updateBook);

module.exports = router;