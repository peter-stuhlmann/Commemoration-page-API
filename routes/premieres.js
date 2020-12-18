const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Premiere = require('../db/models/premieres');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const premieres = await Premiere.find(req.query).sort({
      'piece.plain': 1,
    });

    const response = premieres.map((piece) => {
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
