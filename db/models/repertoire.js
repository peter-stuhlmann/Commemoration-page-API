const mongoose = require('mongoose');

const repertoireSchema = mongoose.Schema(
  {
    repertoire: {
      type: Array,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('repertoires', repertoireSchema);
