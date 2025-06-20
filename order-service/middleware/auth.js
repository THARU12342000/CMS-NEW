const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Customer = require('../models/Customer'); // We need Customer model here or just user ID from token

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // For simplicity, store user ID and isAdmin flag on request
      req.user = { id: decoded.id, isAdmin: decoded.isAdmin };

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
