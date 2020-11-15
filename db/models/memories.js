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

const avatarSchema = mongoose.Schema(
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

const imgSrcSchema = mongoose.Schema(
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
    src: imgSrcSchema,
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
    avatar: avatarSchema,
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
