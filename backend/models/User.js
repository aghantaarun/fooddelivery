const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  role: { type: String, enum: ['customer', 'restaurant', 'admin'], default: 'customer' }
});

module.exports = mongoose.model('User', userSchema);
