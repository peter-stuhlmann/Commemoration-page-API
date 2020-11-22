require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const connectMongo = require('./db/db');
const cors = require('cors');

const corsOptionsDelegate = require('./corsOptions');

const router = require('./routes/index'); 

// connect to DB
connectMongo();

app.use(bodyParser.json());

app.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.status(200).send('Hello World!');
});

app.use('/', router);

app.all('*', (req, res) => {
  res
    .status(404)
    .send(`Error 404: Can't find ${req.originalUrl} on this server!`);
});

app.listen(port, () => console.log(`API listening on port ${port}`));
