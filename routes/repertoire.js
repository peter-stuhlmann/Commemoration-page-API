const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Repertoire = require('../db/models/repertoire');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const repertoire = await Repertoire.find(req.query).sort({'piece.plain' : 1});

    const response = repertoire.map((piece) => {
      const pieceSchema = {
        plain: piece.piece.plain,
        html: piece.piece.html,
      };

      return {
        id: piece.id,
        piece: pieceSchema,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;