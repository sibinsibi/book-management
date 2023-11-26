const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  //All users can acess with login
  try {
    // Fetch all books from the database
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookById = async (req, res) => {
  //All users can acess with login
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addBook = async (req, res) => {
  //only admin can do add books (based on role)
  try {
    const { title, author, description, publishedYear } = req.body.book;

    // Create a new Book instance
    const newBook = new Book({
      title,
      author,
      description,
      publishedYear,
    });

    // Save the new book to the database
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBook = async (req, res) => {
  //only admin can do add books (based on role)
  try {
    const bookId = req.params.id;
    const { title, author, description, publishedYear } = req.body.book;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.publishedYear = publishedYear || book.publishedYear;

    await book.save();

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndRemove(bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };
