const jwt = require("jsonwebtoken")
const JWT_SECRET = 'secrect-dshfnr'

const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};
  
// Verify JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null; // Invalid token
    }
};


module.exports = { generateToken, verifyToken };