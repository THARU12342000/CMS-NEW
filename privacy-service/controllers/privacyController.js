const Privacy = require('../models/Privacy');

// Create or update privacy preferences
const upsertPrivacy = async (req, res) => {
  const customerId = req.user.id;
  const { locationTracking, dataSharing, marketingEmails } = req.body;

  try {
    let prefs = await Privacy.findOne({ customer: customerId });

    if (prefs) {
      // Update existing
      prefs.preferences.locationTracking = locationTracking ?? prefs.preferences.locationTracking;
      prefs.preferences.dataSharing = dataSharing ?? prefs.preferences.dataSharing;
      prefs.preferences.marketingEmails = marketingEmails ?? prefs.preferences.marketingEmails;
      await prefs.save();
      res.json(prefs);
    } else {
      // Create new
      prefs = new Privacy({
        customer: customerId,
        preferences: { locationTracking, dataSharing, marketingEmails }
      });
      await prefs.save();
      res.status(201).json(prefs);
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get privacy preferences for logged-in user
const getPrivacyByUser = async (req, res) => {
  try {
    const prefs = await Privacy.findOne({ customer: req.user.id });
    if (!prefs) return res.status(404).json({ message: 'No privacy preferences found' });
    res.json(prefs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all privacy prefs (admin only)
const getAllPrivacy = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  try {
    const allPrefs = await Privacy.find().populate('customer', 'name email');
    res.json(allPrefs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { upsertPrivacy, getPrivacyByUser, getAllPrivacy };
