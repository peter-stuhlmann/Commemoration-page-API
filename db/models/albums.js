const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
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

const contributingArtistSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    instrument: {
      type: String,
    },
  },
  { versionKey: false }
);

const worksSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    movements: {
      type: Array,
    },
  },
  { versionKey: false }
);

const composerSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    years: {
      type: String,
    },
    works: [worksSchema],
  },
  { versionKey: false }
);

const attachmentSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { versionKey: false }
);

const albumSchema = mongoose.Schema(
  {
    number: {
      type: Number,
    },
    img: imageSchema,
    year: {
      type: String,
    },
    format: {
      type: String,
    },
    contributingArtists: [contributingArtistSchema],
    composer: [composerSchema],
    label: {
      type: String,
    },
    attachments: [attachmentSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model('albums', albumSchema);
