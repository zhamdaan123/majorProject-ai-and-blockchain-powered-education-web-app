const jwt = require('jsonwebtoken');

// Middleware function
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token,  process.env.JWT_SECRET || 'yourFallbackSecret');
    req.user = verified; // Attach user info to the request
    next(); // Proceed to the route
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = verifyToken;
