const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Page = require('../db/models/pages');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const pages = await Page.find(req.query);

    const response = pages.map((page) => {
      const imgSizes = page.img && {
        small: page.img.size.small,
        medium: page.img.size.medium,
        large: page.img.size.large,
      };

      const img = page.img && {
        title: page.img.title,
        alt: page.img.alt,
        copyright: page.img.copyright,
        size: imgSizes,
      };

      const metaData = page.meta && {
        title: page.meta.title,
        description: page.meta.description,
      };

      return {
        id: page.id,
        path: page.path,
        title: page.title,
        content: page.content,
        img: img,
        meta: metaData,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get('/:path', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const page = await Page.find({ path: req.params.path });

    const imgSizes = page[0].img &&
      page[0].img.size && {
        small: page[0].img.size.small,
        medium: page[0].img.size.medium,
        large: page[0].img.size.large,
      };

    const img = page[0].img && {
      title: page[0].img.title,
      alt: page[0].img.alt,
      copyright: page[0].img.copyright,
      size: imgSizes,
    };

    const metaData = page[0].meta && {
      title: page[0].meta.title,
      description: page[0].meta.description,
    };

    const response = {
      id: page[0].id,
      path: page[0].path,
      title: page[0].title,
      content: page[0].content,
      img: img,
      meta: metaData,
    };
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;