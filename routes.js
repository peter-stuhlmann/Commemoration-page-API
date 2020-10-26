const express = require('express');
const routes = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');

const corsOptionsDelegate = require('./corsOptions');

const Album = require('./db/models/albums');
const Card = require('./db/models/cards');
const Choir = require('./db/models/choirs');
const Concert = require('./db/models/concerts');
const Year = require('./db/models/cv');
const Orchestra = require('./db/models/orchestras');
const Page = require('./db/models/pages');
const Picture = require('./db/models/pictures');
const Repertoire = require('./db/models/repertoire');

routes.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.status(200).send('Hello World!');
});

routes.get('/cards', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const cards = await Card.find(req.query);

    const response = cards.map((card) => {
      const img = {
        src: card.img.src,
        alt: card.img.alt,
        title: card.img.title,
      };

      return {
        id: card.id,
        img: img,
        title: card.title,
        description: card.description,
        href: card.href,
        tags: card.tags,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/choirs', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const choirs = await Choir.find(req.query).sort({ choir: 1 });

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
    const concerts = await Concert.find(req.query).sort({ date: 1 });

    const response = concerts.map((concert) => {
      const programs = concert.program.map((program) => {
        return {
          composer: program.composer,
          piece: program.piece,
        };
      });

      const locations = concert.location.map((location) => {
        return {
          city: location.city,
          state: location.state,
        };
      });

      const attachments = concert.attachments.map((attachment) => {
        return {
          title: attachment.title,
          description: attachment.description,
          url: attachment.url,
        };
      });

      return {
        id: concert.id,
        year: concert.year,
        displayDate: concert.displayDate,
        date: concert.date,
        program: programs,
        location: locations,
        venue: concert.venue,
        participants: concert.participants,
        attachments: attachments,
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

    const locations = concert[0].location.map((location) => {
      return {
        city: location.city,
        state: location.state,
      };
    });

    const attachments = concert[0].attachments.map((attachment) => {
      return {
        title: attachment.title,
        description: attachment.description,
        url: attachment.url,
      };
    });

    const response = {
      id: concert[0].id,
      year: concert[0].year,
      displayDate: concert[0].displayDate,
      date: concert[0].date,
      program: programs,
      location: locations,
      venue: concert[0].venue,
      participants: concert[0].participants,
      attachments: attachments,
    };

    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/cv', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const years = await Year.find(req.query).sort({ year: 1 });

    const response = years.map((year) => {

      const events = year.events.map((event) => {
        
        const mediaFiles = event.media.map((item) => {
          return {
            title: item.title,
            path: item.path,
            format: item.format,
          };
        });

        return {
          date: event.date,
          title: event.title,
          description: event.description,
          media: mediaFiles,
        };
      });

      return {
        id: year.id,
        year: year.year,
        events: events,
      };
    });

    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/cv/:year', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const year = await Year.find({ year: req.params.year });

    const events = year[0].events.map((event) => {
        
      const mediaFiles = event.media.map((item) => {
        return {
          title: item.title,
          path: item.path,
          format: item.format,
        };
      });

      return {
        date: event.date,
        title: event.title,
        description: event.description,
        media: mediaFiles,
      };
    });

    const response = {
      id: year[0].id,
      year: year[0].year,
      events: events,
    };

    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/discography', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const albums = await Album.find(req.query).sort({ number: 1 });

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

      return {
        id: album.id,
        number: album.number,
        img: images,
        year: album.year,
        format: album.format,
        contributingArtists: contributingArtists,
        composer: album.composer,
        works: album.works,
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

    const response = {
      id: album[0].id,
      number: album[0].number,
      img: images,
      year: album[0].year,
      format: album[0].format,
      contributingArtists: contributingArtists,
      composer: album[0].composer,
      works: album[0].works,
      label: album[0].label,
    };

    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/orchestras', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const orchestras = await Orchestra.find(req.query).sort({ orchestra: 1 });

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
      const imgSizes = page.img && {
        small: page.img.size.small,
        medium: page.img.size.medium,
        large: page.img.size.large,
      };

      const img = page.img && {
        title: page.img.title,
        alt: page.img.alt,
        copyright: page.img.copyright,
        size: imgSizes,
      };

      const metaData = page.meta && {
        title: page.meta.title,
        description: page.meta.description,
      };

      return {
        id: page.id,
        path: page.path,
        title: page.title,
        content: page.content,
        img: img,
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

    const imgSizes = page[0].img &&
      page[0].img.size && {
        small: page[0].img.size.small,
        medium: page[0].img.size.medium,
        large: page[0].img.size.large,
      };

    const img = page[0].img && {
      title: page[0].img.title,
      alt: page[0].img.alt,
      copyright: page[0].img.copyright,
      size: imgSizes,
    };

    const metaData = page[0].meta && {
      title: page[0].meta.title,
      description: page[0].meta.description,
    };

    const response = {
      id: page[0].id,
      path: page[0].path,
      title: page[0].title,
      content: page[0].content,
      img: img,
      meta: metaData,
    };
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/pictures', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const pictures = await Picture.find(req.query).sort({ date: 1 });

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
        copyright: picture.copyright,
        date: picture.date,
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
      copyright: picture[0].copyright,
      date: picture[0].date,
    };
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

routes.get('/repertoire', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const repertoire = await Repertoire.find(req.query).sort({ piece: 1 });

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

routes.post('/send-message', cors(corsOptionsDelegate), (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  // const html = `<b>Name</b>: ${name}<br /><b>E-Mail:</b> ${email}<br /><b>Subject:</b> ${subject}<br /><b>Message:</b> ${message} `;
  const text = `Name: ${name} \nE-Mail: ${email} \nSubject: ${subject} \nMessage: ${message} `;

  const mail = {
    from: `"${name}" ${email}`,
    to: process.env.USER,
    subject: subject,
    // html: html,
    text: text,
  };

  transporter.sendMail(mail, (err) => {
    if (err) {
      res.json({
        status: 'fail',
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });
});

module.exports = routes;
