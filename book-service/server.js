const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');  // Import the connectDB module
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

connectDB();  // Call the connectDB function to initialize MongoDB

app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Book Service is running on port ${PORT}`);
});
