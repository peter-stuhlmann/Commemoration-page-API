const mongoose = require('mongoose');

const mediaSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    path: {
      type: String,
    },
    format: {
      type: String,
    },
    language: {
      type: String,
    },
  },
  { versionKey: false }
);

const eventsSchema = mongoose.Schema(
  {
    date: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    media: [mediaSchema],
  },
  { versionKey: false }
);

const cvSchema = mongoose.Schema(
  {
    year: {
      type: Number,
    },
    events: [eventsSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model('events', cvSchema);
