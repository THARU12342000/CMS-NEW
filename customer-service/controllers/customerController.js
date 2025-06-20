const Customer = require('../models/Customer');
const generateToken = require('../utils/generateToken');

// Register new customer
const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const customer = new Customer({ name, email, password });
    await customer.save();

    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      isAdmin: customer.isAdmin,
      token: generateToken(customer._id, customer.isAdmin),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login customer
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (customer && (await customer.matchPassword(password))) {
      res.json({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        isAdmin: customer.isAdmin,
        token: generateToken(customer._id, customer.isAdmin),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all customers (admin only)
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().select('-password');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerCustomer, loginCustomer, getCustomers };
