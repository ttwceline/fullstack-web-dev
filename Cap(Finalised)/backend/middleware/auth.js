// middleware/auth.js (Same as your file)
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  // Must match the secret used in routes/auth.js
  jwt.verify(token, "w4h9V7xYpL3QmZ8tR2fN6jBvXsC1KdPzF0qW8eYtUaMvJrXn", (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded; // Contains { id: user._id }
    next();
  });
}

module.exports = verifyToken;