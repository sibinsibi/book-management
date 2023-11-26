const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const {
  verifyToken,
  authorizeAdmin,
} = require("../../shared/middlewares/authMiddleware");

router.get("/", verifyToken, getAllBooks);
router.get("/:id", verifyToken, getBookById);
router.post("/addBook", verifyToken, authorizeAdmin, addBook);
router.put("/:id", verifyToken, authorizeAdmin, updateBook);
router.delete("/:id",  verifyToken, authorizeAdmin, deleteBook);

module.exports = router;
