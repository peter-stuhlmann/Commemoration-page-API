const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Orchestra = require('../db/models/orchestras');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const orchestras = await Orchestra.find(req.query).sort({ orchestra: 1 });

    const response = orchestras.map((orchestra) => {
      return {
        id: orchestra.id,
        orchestra: orchestra.orchestra,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});


module.exports = router;