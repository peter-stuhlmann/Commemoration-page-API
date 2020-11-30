require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');

const router = require('./routes/index');

// connect to DB
const connectMongo = require('./db/db');
connectMongo();

app.use(bodyParser.json());

app.use('/', router);

app.all('*', (req, res) => {
  res
    .status(404)
    .send(`Error 404: Can't find ${req.originalUrl} on this server!`);
});

app.listen(port, () => console.log(`API listening on port ${port}`));
