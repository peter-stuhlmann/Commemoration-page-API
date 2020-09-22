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

const albumSchema = mongoose.Schema(
  {
    number: {
      type: Number,
    },
    img: imageSchema,
    year: {
      type: Number,
    },
    format: {
      type: String,
    },
    contributingArtists: [contributingArtistSchema],
    composer: {
      type: String,
    },
    works: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('albums', albumSchema);
