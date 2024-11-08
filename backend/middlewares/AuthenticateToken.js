const { verifyAccessToken } = require('../utli/Jwtutli');  // Import your JWT utility functions

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];


  // If token doesn't exist, return an error
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  const decoded = verifyAccessToken(token);

  // If the token is invalid or expired
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }

  // Check if the role is 'admin'
  if (decoded.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied. You do not have admin privileges.' });
}

  // If the role is admin, attach the user information to the request and call next()
  req.user = decoded; // You can store the decoded token in req.user for later use
  next();
};

module.exports = authenticateToken;

