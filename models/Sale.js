const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  plates: { type: String, unique: true },
  carType: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true, validate: [{validator: (value) => {return value >=1800  && value <= 2024;},message: 'Year must be between 1800 and 2024',}]},
  price: {type: Number, required: true},
});

const sales = mongoose.model('sale', userSchema);

module.exports = sales;
