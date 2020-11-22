const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Choir = require('../db/models/choirs');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const choirs = await Choir.find(req.query).sort({ choir: 1 });

    const response = choirs.map((choir) => {
      return {
        id: choir.id,
        choir: choir.choir,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;