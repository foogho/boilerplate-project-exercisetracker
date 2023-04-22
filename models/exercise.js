const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    description: String,
    duration: Number,
    date: {
      type: Date,
      get: function (v) {
        return v.toDateString();
      },
    },
  },
  { id: false, versionKey: false , toObject : { getters : true } }
);
