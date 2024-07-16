const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  data: [{
    date: { type: Date, required: true },
    value: { type: Number, required: true },
    unit: { type: String, required: true }
  }]
});

module.exports = mongoose.model('Report', reportSchema);
