const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');

const corsOptionsDelegate = require('../corsOptions');

router.post('/', cors(corsOptionsDelegate), (req, res) => {
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

module.exports = router;