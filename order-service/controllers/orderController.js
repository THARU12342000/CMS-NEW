const Order = require('../models/Order');
const mongoose = require('mongoose');

// Place new order
const placeOrder = async (req, res) => {
  const { product, quantity, totalPrice } = req.body;
  const customerId = req.user.id;

  try {
    const order = new Order({
      customer: customerId,
      product,
      quantity,
      totalPrice,
    });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get orders for logged-in user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate('product', 'name price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  try {
    const orders = await Order.find()
      .populate('product', 'name price')
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };
