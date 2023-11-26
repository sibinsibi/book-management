const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.body.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Unauthorized: Insufficient privileges" });
  }
  next();
};

module.exports = { verifyToken, authorizeAdmin };
