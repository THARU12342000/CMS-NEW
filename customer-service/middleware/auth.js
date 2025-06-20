const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.customer = await Customer.findById(decoded.id).select('-password');
      if (!req.customer) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};

module.exports = { protect };
