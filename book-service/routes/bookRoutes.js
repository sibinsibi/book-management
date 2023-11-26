const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { verifyToken, authorizeAdmin } = require('../../shared/middlewares/authMiddleware');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/addBook', verifyToken, authorizeAdmin, addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
