const AuditLog = require('../models/AuditLog');

// Create a new audit log entry
const createLog = async (req, res) => {
  const { action } = req.body;
  const userId = req.user ? req.user.id : null;
  const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];

  try {
    const log = new AuditLog({
      user: userId,
      action,
      ipAddress,
      userAgent,
    });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create audit log' });
  }
};

// Get all audit logs (admin only)
const getAllLogs = async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  try {
    const logs = await AuditLog.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch audit logs' });
  }
};

module.exports = { createLog, getAllLogs };
