const express = require('express');
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/myorders', protect, getUserOrders);
router.get('/', protect, getAllOrders);            // Admin only, check inside controller
router.put('/:id/status', protect, updateOrderStatus);  // Admin only

module.exports = router;
