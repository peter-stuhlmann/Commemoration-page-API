require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const connectMongo = require('./db/db');

const Album = require('./db/models/albums');

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

app.get('/discography', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const albums = await Album.find(req.query);

    const response = albums.map((album) => {
      const contributingArtists = album.contributingArtists.map(
        (contributingArtist) => {
          return {
            name: contributingArtist.name,
            instrument: contributingArtist.instrument,
          };
        }
      );

      const tracklist = album.tracklist.map((track) => {
        return {
          composer: track.composer,
          piece: track.piece,
        };
      });

      return {
        id: album.id,
        title: album.title,
        img: album.img,
        year: album.year,
        format: album.format,
        contributingArtists: contributingArtists,
        tracklist: tracklist,
        label: album.label,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

app.get('/discography/:id', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const album = await Album.find({ _id: req.params.id });

    const contributingArtists = album[0].contributingArtists.map(
      (contributingArtist) => {
        return {
          name: contributingArtist.name,
          instrument: contributingArtist.instrument,
        };
      }
    );

    const tracklist = album[0].tracklist.map((track) => {
      return {
        composer: track.composer,
        piece: track.piece,
      };
    });

    const response = {
      id: album[0].id,
      title: album[0].title,
      img: album[0].img,
      year: album[0].year,
      format: album[0].format,
      contributingArtists: contributingArtists,
      tracklist: tracklist,
      label: album[0].label,
    };

    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

app.use('/img', express.static(__dirname + '/img'));

app.all('*', (req, res) => {
  res
    .status(404)
    .send(`Error 404: Can't find ${req.originalUrl} on this server!`);
});

app.listen(port, () => console.log(`API listening on port ${port}`));
