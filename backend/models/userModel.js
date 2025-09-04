const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitter: {
    id: String,
    token: String,
    tokenSecret: String,
  },
  linkedin: {
    id: String,
    accessToken: String,
  },
  facebook: {
    id: String,
    accessToken: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
