const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
  console.log('auth called');
  const token = req.cookies.jwt;

  // Check if token exists and is verified
  if (token) {
    jwt.verify(token, 'mysecretkey', async (err, decodedToken) => {
      if (err) {
        console.error('Token verification error:', err);
        res.redirect('/overview');
      } else {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};

module.exports = requireAuth;
