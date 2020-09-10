const express = require('express');
const routes = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('./corsOptions');
const Album = require('./db/models/albums');

routes.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.status(200).send({ data });
});

routes.get('/discography', cors(corsOptionsDelegate), async (req, res) => {
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

routes.get('/discography/:id', cors(corsOptionsDelegate), async (req, res) => {
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

module.exports = routes;
