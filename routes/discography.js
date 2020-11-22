const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Album = require('../db/models/albums');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const albums = await Album.find(req.query).sort({ number: -1 });

    const response = albums.map((album) => {
      const images = {
        small: album.img.small,
        medium: album.img.medium,
        large: album.img.large,
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
        img: images,
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

    const images = {
      small: album[0].img.small,
      medium: album[0].img.medium,
      large: album[0].img.large,
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
      img: images,
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