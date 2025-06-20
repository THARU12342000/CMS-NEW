const express = require('express');
const { createLog, getAllLogs } = require('../controllers/auditController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, createLog);   // create a log entry
router.get('/', protect, getAllLogs);   // admin only - view logs

module.exports = router;
