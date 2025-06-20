const express = require('express');
const { upsertPrivacy, getPrivacyByUser, getAllPrivacy } = require('../controllers/privacyController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, upsertPrivacy);
router.get('/me', protect, getPrivacyByUser);
router.get('/', protect, getAllPrivacy); // admin only

module.exports = router;
