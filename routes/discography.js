const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Album = require('../db/models/albums');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const albums = await Album.find(req.query).sort({ number: -1 });

    const response = albums.map((album) => {
      const squareCover = {
        small: album.cover.format.square.small,
        medium: album.cover.format.square.medium,
        large: album.cover.format.square.large,
      };

      const originalCover = {
        small: album.cover.format.original.small,
        medium: album.cover.format.original.medium,
        large: album.cover.format.original.large,
      };

      const coverFormat = {
        square: squareCover,
        original: originalCover,
      };

      const cover = {
        format: coverFormat,
      };

      const contributingArtists = album.contributingArtists.map(
        (contributingArtist) => {
          return {
            name: contributingArtist.name,
            instrument: contributingArtist.instrument,
          };
        }
      );

      const composer = album.composer.map((composer) => {
        const works = composer.works.map((work) => {
          return {
            title: work.title,
            movements: work.movements,
          };
        });

        return {
          name: composer.name,
          years: composer.years,
          works: works,
        };
      });

      return {
        id: album.id,
        number: album.number,
        title: album.title,
        cover: cover,
        year: album.year,
        format: album.format,
        contributingArtists: contributingArtists,
        composer: composer,
        label: album.label,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get('/:number', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const album = await Album.find({ number: req.params.number });

    const squareCover = {
      small: album[0].cover.format.square.small,
      medium: album[0].cover.format.square.medium,
      large: album[0].cover.format.square.large,
    };

    const originalCover = {
      small: album[0].cover.format.original.small,
      medium: album[0].cover.format.original.medium,
      large: album[0].cover.format.original.large,
    };

    const coverFormat = {
      square: squareCover,
      original: originalCover,
    };

    const cover = {
      format: coverFormat,
    };

    const contributingArtists = album[0].contributingArtists.map(
      (contributingArtist) => {
        return {
          name: contributingArtist.name,
          instrument: contributingArtist.instrument,
        };
      }
    );

    const composer = album[0].composer.map((composer) => {
      const works = composer.works.map((work) => {
        return {
          title: work.title,
          movements: work.movements,
        };
      });

      return {
        name: composer.name,
        years: composer.years,
        works: works,
      };
    });

    const response = {
      id: album[0].id,
      number: album[0].number,
      title: album[0].title,
      cover: cover,
      year: album[0].year,
      format: album[0].format,
      contributingArtists: contributingArtists,
      composer: composer,
      label: album[0].label,
    };

    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
