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

const premiereSchema = mongoose.Schema(
  {
    piece: pieceSchema,
  },
  { versionKey: false }
);

module.exports = mongoose.model('premieres', premiereSchema);
