const mongoose = require('mongoose');

const repertoireSchema = mongoose.Schema(
  {
    piece: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('pieces', repertoireSchema);
