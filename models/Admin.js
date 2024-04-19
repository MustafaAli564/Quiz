const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true},
});

const Admins = mongoose.model('Admin', adminSchema);

module.exports = Admins;