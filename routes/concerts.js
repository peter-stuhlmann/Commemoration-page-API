const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Concert = require('../db/models/concerts');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
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

router.get('/:id', cors(corsOptionsDelegate), async (req, res) => {
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


module.exports = router;