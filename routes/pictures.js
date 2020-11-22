const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Picture = require('../db/models/pictures');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const pictures = await Picture.find(req.query).sort({ date: 1 });

    const response = pictures.map((picture) => {
      return {
        id: picture.id,
        src: picture.src,
        srcSet: picture.srcSet,
        sizes: picture.sizes,
        width: picture.width,
        height: picture.height,
        title: picture.title,
        alt: picture.alt,
        copyright: picture.copyright,
        date: picture.date,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get('/:id', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const picture = await Picture.find({ _id: req.params.id });

    const response = {
      id: picture[0].id,
      src: picture[0].src,
      srcSet: picture[0].srcSet,
      sizes: picture[0].sizes,
      width: picture[0].width,
      height: picture[0].height,
      title: picture[0].title,
      alt: picture[0].alt,
      copyright: picture[0].copyright,
      date: picture[0].date,
    };
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;