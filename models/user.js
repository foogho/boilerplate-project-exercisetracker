const mongoose = require('mongoose');

const exerciseSchema = require('./exercise');

const schema = new mongoose.Schema(
  {
    username: String,
    log: [exerciseSchema],
  },
  {
    virtuals: {
      count: {
        get: function () {
          return this.log.length;
        },
      },
    },
    id: false,
    versionKey: false,
  }
);

module.exports = mongoose.model('User', schema);
