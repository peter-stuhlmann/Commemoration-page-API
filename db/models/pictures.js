const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema(
  {
    src: {
      type: String,
    },
    srcSet: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    title: {
      type: String,
    },
    alt: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('pictures', pictureSchema);
