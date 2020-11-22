const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Card = require('../db/models/cards');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const cards = await Card.find(req.query);

    const response = cards.map((card) => {
      const img = {
        src: card.img.src,
        alt: card.img.alt,
        title: card.img.title,
      };

      return {
        id: card.id,
        img: img,
        title: card.title,
        description: card.description,
        href: card.href,
        tags: card.tags,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;