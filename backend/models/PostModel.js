const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  platform: { type: String, enum: ['twitter', 'linkedin', 'facebook'] },
  content: String,
  status: { type: String, enum: ['scheduled', 'posted', 'failed'], default: 'posted' },
  scheduledAt: Date,
  error: String,
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
