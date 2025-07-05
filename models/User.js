const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(), // Optional, can be removed
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Email is invalid'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least 8 characters, 1 letter, and 1 number'],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'barber'], // Optional: restrict roles
  },
  contacts: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

require('../utils/hooks')(userSchema);
require('../utils/modelMethods')(userSchema);

module.exports = mongoose.model('User', userSchema);
