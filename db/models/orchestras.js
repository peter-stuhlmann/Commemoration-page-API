const mongoose = require('mongoose');

const orchestraSchema = mongoose.Schema(
  {
    orchestra: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('orchestras', orchestraSchema);
