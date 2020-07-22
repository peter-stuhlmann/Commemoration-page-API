const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const { data } = require('./data');

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

app.listen(port, () => console.log(`API listening on port ${port}`));
