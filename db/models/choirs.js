const mongoose = require('mongoose');

const choirSchema = mongoose.Schema(
  {
    choir: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('choirs', choirSchema);
