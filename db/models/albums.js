const mongoose = require('mongoose');

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

const trackSchema = mongoose.Schema(
  {
    composer: {
      type: String,
    },
    piece: {
      type: String,
    },
  },
  { versionKey: false }
);

const albumSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    year: {
      type: String,
    },
    format: {
      type: String,
    },
    contributingArtists: [contributingArtistSchema],
    tracklist: [trackSchema],
    label: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('albums', albumSchema);
