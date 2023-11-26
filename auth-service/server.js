const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db"); // Import the connectDB module
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB(); // Call the connectDB function to initialize MongoDB
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
});
