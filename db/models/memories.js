const mongoose = require('mongoose');

const nameSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  { versionKey: false }
);

const imgSchema = mongoose.Schema(
  {
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
    copyright: {
      type: String,
    },
  },
  { versionKey: false }
);

const authorSchema = mongoose.Schema(
  {
    name: nameSchema,
    img: imgSchema,
    biography: {
      type: Array,
    },
  },
  { versionKey: false }
);

const memoriesSchema = mongoose.Schema(
  {
    author: authorSchema,
    text: {
      type: Array,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('memories', memoriesSchema);
