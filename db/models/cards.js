const mongoose = require('mongoose');

const imgSchema = mongoose.Schema(
  {
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { versionKey: false }
);

const cardSchema = mongoose.Schema(
  {
    img: imgSchema,
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    href: {
      type: String,
    },
    tags: {
      type: Array,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('cards', cardSchema);
