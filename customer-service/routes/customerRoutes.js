const express = require('express');
const { registerCustomer, loginCustomer, getCustomers } = require('../controllers/customerController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.get('/', protect, getCustomers);  // protected route to get all customers

module.exports = router;
