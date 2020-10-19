const mongoose = require('mongoose');

const metaSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false }
);

const pageSchema = mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
    },
    content: {
      type: Array,
    },
    meta: metaSchema,
  },
  { versionKey: false }
);

module.exports = mongoose.model('pages', pageSchema);
