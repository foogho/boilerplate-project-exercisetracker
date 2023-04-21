const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  description: String,
  duration: Number,
  date: Date,
});
