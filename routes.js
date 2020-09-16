const express = require('express');
const routes = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('./corsOptions');

const Album = require('./db/models/albums');
const Choir = require('./db/models/choirs');
const Concert = require('./db/models/concerts');
const Orchestra = require('./db/models/orchestras');
const Page = require('./db/models/pages');
const Picture = require('./db/models/pictures');
const Repertoire = require('./db/models/repertoire');

routes.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.status(200).send('Hello World!');
});

routes.get('/choirs', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const choirs = await Choir.find(req.query);

    const response = choirs.map((choir) => {
      return {
        id: choir.id,
        choir: choir.choir,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/concerts', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const concerts = await Concert.find(req.query);

    const response = concerts.map((concert) => {
      const programs = concert.program.map((program) => {
        return {
          composer: program.composer,
          piece: program.piece,
        };
      });

      return {
        id: concert.id,
        year: concert.year,
        date: concert.date,
        program: programs,
        location: concert.location,
        venue: concert.venue,
        participants: concert.participants,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/concerts/:id', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const concert = await Concert.find({ _id: req.params.id });

    const programs = concert[0].program.map((program) => {
      return {
        composer: program.composer,
        piece: program.piece,
      };
    });

    const response = {
      id: concert[0].id,
      year: concert[0].year,
      date: concert[0].date,
      program: programs,
      location: concert[0].location,
      venue: concert[0].venue,
      participants: concert[0].participants,
    };

    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
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

routes.get('/orchestras', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const orchestras = await Orchestra.find(req.query);

    const response = orchestras.map((orchestra) => {
      return {
        id: orchestra.id,
        orchestra: orchestra.orchestra,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/pages', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const pages = await Page.find(req.query);

    const response = pages.map((page) => {
      const metaData = {
        title: page.meta.title,
        description: page.meta.description,
      };

      return {
        id: page.id,
        path: page.path,
        title: page.title,
        content: page.content,
        meta: metaData,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/pages/:path', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const page = await Page.find({ path: req.params.path });

    const metaData = {
      title: page[0].meta.title,
      description: page[0].meta.description,
    };

    const response = {
      id: page[0].id,
      path: page[0].path,
      title: page[0].title,
      content: page[0].content,
      meta: metaData,
    };
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/pictures', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const pictures = await Picture.find(req.query);

    const response = pictures.map((picture) => {
      return {
        id: picture.id,
        src: picture.src,
        srcSet: picture.srcSet,
        sizes: picture.sizes,
        width: picture.width,
        height: picture.height,
        title: picture.title,
        alt: picture.alt,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/pictures/:id', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const picture = await Picture.find({ _id: req.params.id });

    const response = {
      id: picture[0].id,
      src: picture[0].src,
      srcSet: picture[0].srcSet,
      sizes: picture[0].sizes,
      width: picture[0].width,
      height: picture[0].height,
      title: picture[0].title,
      alt: picture[0].alt,
    };
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/repertoire', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const repertoire = await Repertoire.find(req.query);

    const response = repertoire.map((piece) => {
      return {
        id: piece.id,
        piece: piece.piece,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = routes;
