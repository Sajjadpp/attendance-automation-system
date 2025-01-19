const { verifyToken } = require('../services/jwt');

const authenticate = (req, res, next) => {
  const token = req.cookies.authToken; // Get token from cookies
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  req.user = decoded; // Attach user info to the request
  next();
};

module.exports = {authenticate};
