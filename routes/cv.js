const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Year = require('../db/models/cv');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const years = await Year.find(req.query).sort({ year: 1 });

    const response = years.map((year) => {

      const events = year.events.map((event) => {
        
        const imgFiles = event.media.img.map((img) => {

          const imgSizes = {
            small: img.path.small,
            medium: img.path.medium,
            large: img.path.large,
          };
          
          return {
            title: img.title,
            path: imgSizes,
          };
        });

        const pdfFiles = event.media.pdf.map((pdf) => {
          return {
            title: pdf.title,
            path: pdf.path,
            language: pdf.language,
          };
        });

        const mediaFiles = {          
          img: imgFiles,
          pdf: pdfFiles,
        };

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

router.get('/:year', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const year = await Year.find({ year: req.params.year });

    const events = year[0].events.map((event) => {
        
      const imgFiles = event.media.img.map((img) => {

        const imgSizes = {
          small: img.path.small,
          medium: img.path.medium,
          large: img.path.large,
        };
        
        return {
          title: img.title,
          path: imgSizes,
        };
      });

      const pdfFiles = event.media.pdf.map((pdf) => {
        return {
          title: pdf.title,
          path: pdf.path,
          language: pdf.language,
        };
      });

      const mediaFiles = {          
        img: imgFiles,
        pdf: pdfFiles,
      };

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

module.exports = router;