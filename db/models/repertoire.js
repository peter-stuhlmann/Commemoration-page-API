const mongoose = require('mongoose');

const pieceSchema = mongoose.Schema(
  {
    plain: {
      type: String,
    },
    html: {
      type: String,
    },
  },
  { versionKey: false }
);

const repertoireSchema = mongoose.Schema(
  {
    piece: pieceSchema,
  },
  { versionKey: false }
);

module.exports = mongoose.model('pieces', repertoireSchema);
