const mongoose = require('mongoose');

const imgSizeSchema = mongoose.Schema(
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
    path: imgSizeSchema,
  },
  { versionKey: false }
);

const pdfSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    path: {
      type: String,
    },
    language: {
      type: String,
    },
  },
  { versionKey: false }
);

const mediaSchema = mongoose.Schema(
  {
    img: [imgSchema],
    pdf: [pdfSchema],
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
    media: mediaSchema,
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
