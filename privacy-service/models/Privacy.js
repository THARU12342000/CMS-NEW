const mongoose = require('mongoose');

const privacySchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  preferences: {
    locationTracking: { type: Boolean, default: false },
    dataSharing: { type: Boolean, default: false },
    marketingEmails: { type: Boolean, default: false },
    // Add more as needed
  }
}, { timestamps: true });

module.exports = mongoose.model('Privacy', privacySchema);
