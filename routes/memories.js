const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

const Memory = require('../db/models/memories');

router.get('/', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const memories = await Memory.find(req.query).sort({ 'author.name.lastName': 1 });

    const response = memories.map((memory) => {
      const name = {
        firstName: memory.author.name.firstName,
        lastName: memory.author.name.lastName,
      }

      const avatar = {
        src: memory.author.avatar.src,
        alt: memory.author.avatar.alt,
        copyright: memory.author.avatar.copyright,
      }

      const imgSrc = {
        small: memory.author.img.src.small,
        medium: memory.author.img.src.medium,
        large: memory.author.img.src.large,
      }

      const img = {
        src: imgSrc,
        alt: memory.author.img.alt,
        copyright: memory.author.img.copyright,
      }

      const author = {
        name: name,
        avatar: avatar,
        img: img,
        biography: memory.author.biography,
      };

      return {
        id: memory.id,
        author: author,
        text: memory.text,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get('/authors', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const memories = await Memory.find(req.query).sort({ 'author.name.lastName': 1 });

    const response = memories.map((memory) => {
      const name = {
        firstName: memory.author.name.firstName,
        lastName: memory.author.name.lastName,
      }

      const avatar = {
        src: memory.author.avatar.src,
        alt: memory.author.avatar.alt,
        copyright: memory.author.avatar.copyright,
      }

      const author = {
        name: name,
        avatar: avatar,
      };

      return {
        id: memory.id,
        author: author,
      };
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get('/:id', cors(corsOptionsDelegate), async (req, res) => {
  try {
    const memory = await Memory.find({ _id: req.params.id });

    const name = {
      firstName: memory[0].author.name.firstName,
      lastName: memory[0].author.name.lastName,
    }

    const avatar = {
      src: memory[0].author.avatar.src,
      alt: memory[0].author.avatar.alt,
      copyright: memory[0].author.avatar.copyright,
    }

    const imgSrc = {
      small: memory[0].author.img.src.small,
      medium: memory[0].author.img.src.medium,
      large: memory[0].author.img.src.large,
    }

    const img = {
      src: imgSrc,
      alt: memory[0].author.img.alt,
      copyright: memory[0].author.img.copyright,
    }

    const author = {
      name: name,
      avatar: avatar,
      img: img,
      biography: memory[0].author.biography,
    };

    const response = {
      id: memory[0].id,
      author: author,
      text: memory[0].text,
    };
  
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;