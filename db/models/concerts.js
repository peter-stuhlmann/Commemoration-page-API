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

const concertSchema = mongoose.Schema(
  {
    year: {
      type: Number,
    },
    date: {
      type: String,
    },
    program: [programSchema],
    location: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
    },
    venue: {
      type: String,
    },
    participants: {
      type: Array,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('concerts', concertSchema);
