const express = require('express');
const { createAgreement, getUserAgreements, getAllAgreements } = require('../controllers/agreementController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, createAgreement);
router.get('/me', protect, getUserAgreements);
router.get('/', protect, getAllAgreements);  // admin only, check inside controller

module.exports = router;
