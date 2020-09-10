require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const connectMongo = require('./db/db');

// connect to DB
connectMongo();

const { whitelist } = require('./whitelist');

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.status(200).send({ data });
});

app.use('/img', express.static(__dirname + '/img'));

app.all('*', (req, res) => {
  res
    .status(404)
    .send(`Error 404: Can't find ${req.originalUrl} on this server!`);
});

app.listen(port, () => console.log(`API listening on port ${port}`));
