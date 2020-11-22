const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const cards = require('./cards'); 
const choirs = require('./choirs'); 
const concerts = require('./concerts'); 
const cv = require('./cv'); 
const discography = require('./discography'); 
const memories = require('./memories'); 
const orchestras = require('./orchestras'); 
const pages = require('./pages'); 
const pictures = require('./pictures'); 
const repertoire = require('./repertoire'); 
const sendMessage = require('./send-message'); 


router.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.status(200).send('Hello World!');
});

router.use('/cards', cards);
router.use('/choirs', choirs);
router.use('/concerts', concerts);
router.use('/cv', cv);
router.use('/discography', discography);
router.use('/memories', memories);
router.use('/orchestras', orchestras);
router.use('/pages', pages);
router.use('/pictures', pictures);
router.use('/repertoire', repertoire);
router.use('/send-message', sendMessage);

module.exports = router;