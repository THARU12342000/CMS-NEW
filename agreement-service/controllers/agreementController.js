const Agreement = require('../models/Agreement');

// Add new consent agreement
const createAgreement = async (req, res) => {
  const { consentText, consentType } = req.body;
  const customerId = req.user.id;

  try {
    const agreement = new Agreement({
      customer: customerId,
      consentText,
      consentType,
    });
    await agreement.save();
    res.status(201).json(agreement);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get consents for logged-in user
const getUserAgreements = async (req, res) => {
  try {
    const agreements = await Agreement.find({ customer: req.user.id });
    res.json(agreements);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all consents (admin)
const getAllAgreements = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  try {
    const agreements = await Agreement.find().populate('customer', 'name email');
    res.json(agreements);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAgreement, getUserAgreements, getAllAgreements };
