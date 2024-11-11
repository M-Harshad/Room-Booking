const jwt = require('jsonwebtoken');
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

// Generate an Access Token (short-lived)
const generateAccessToken = (user) => {
  console.log(user)
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '20m' }
  );
};

// Generate a Refresh Token (long-lived)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } 
  );
};

// Verify the Access Token (called on every request to protected routes)
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; 
  }
};

// Verify the Refresh Token (called when refreshing the Access Token)
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

// Extract expiration time from Access Token
const getTokenExpirationTime = (token) => {
  try {
    const decoded = jwt.decode(token); 
    return decoded ? decoded.exp * 1000 : null;  
  } catch (error) {
    return null;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, getTokenExpirationTime };
