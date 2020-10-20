const mongoose = require('mongoose');

const imgSizesSchema = mongoose.Schema(
  {
    small: {
      type: String,
    },
    medium: {
      type: String,
    },
    large: {
      type: String,
    },
  },
  { versionKey: false }
);

const imgSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    alt: {
      type: String,
    },
    copyright: {
      type: String,
    },
    size: imgSizesSchema,
  },
  { versionKey: false }
);

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
    img: imgSchema,
    meta: metaSchema,
  },
  { versionKey: false }
);

module.exports = mongoose.model('pages', pageSchema);
