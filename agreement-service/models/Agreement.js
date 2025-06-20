const mongoose = require('mongoose');

const agreementSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  consentText: { type: String, required: true },
  consentType: { type: String, required: true }, // e.g., marketing, data-sharing
  agreedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' }    // active, withdrawn, etc.
}, { timestamps: true });

module.exports = mongoose.model('Agreement', agreementSchema);
