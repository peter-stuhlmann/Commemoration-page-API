const express = require('express');
const app = express();
const port = 3000;

const { data } = require('./data');

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  res.status(200).send({ data });
});

app.listen(port, () => console.log(`API listening on port ${port}`));
