const mongoose = require('mongoose');

const programSchema = mongoose.Schema(
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

const locationSchema = mongoose.Schema(
  {
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  { versionKey: false }
);

const concertSchema = mongoose.Schema(
  {
    year: {
      type: Number,
    },
    displayDate: {
      type: Array,
    },
    date: {
      type: Array,
    },
    program: [programSchema],
    location: [locationSchema],
    venue: {
      type: Array,
    },
    participants: {
      type: Array,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('concerts', concertSchema);
