const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    let { username, password, role } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    password = hashedPassword;
    const user = new User({
      username,
      password,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    //console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Provided Password:", password);
    console.log("Stored Password:", user.password);

    // Compare password
    const passwordMatch = await bcrypt.compare(password.trim(), user.password);

    console.log("passwordMatch:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: "6h", // Token expiration time
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser };
