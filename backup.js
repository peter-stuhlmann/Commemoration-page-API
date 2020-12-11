require('dotenv').config();

const fetch = require('node-fetch');
const fs = require('fs');
const archiver = require('archiver');

const routes = require('./routes');

const dir = './backup';

let date = new Date();
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const hour = ('0' + date.getHours()).slice(-2);
const minute = ('0' + date.getMinutes()).slice(-2);
const second = ('0' + date.getSeconds()).slice(-2);

const backupTime = `${year}-${month}-${day}--${hour}-${minute}-${second}`;

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  reset: '\x1b[0m',
};

let progress = 0;
let errorCounter = 0;

// create directories
const createDirectories = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(`${dir}`);
    fs.mkdirSync(`${dir}/${backupTime}`);
  } else {
    fs.mkdirSync(`${dir}/${backupTime}`);
  }
};

// create backup
const createBackup = () => {
  routes.map((route) => {
    fetch(`${process.env.API_URL}/${route}`)
      .then((res) => res.text())
      .then((text) => {
        // json
        fs.writeFile(`${dir}/${backupTime}/${route}.json`, text, function () {
          const jsonFile = `${dir}/${backupTime}/${route}.json`;
          archive.append(fs.createReadStream(jsonFile), {
            name: `${route}.json`,
          });

          if (text.startsWith('[')) {
            console.log(
              colors.green,
              `Created json file for /${route}.`,
              colors.reset
            );
            progress = progress + 1;
            if (progress === routes.length) {
              archive.finalize();
              resume();
            }
          } else {
            errorCounter = errorCounter + 1;
            console.log(
              colors.red,
              `Error! Creating json failed for /${route}.`,
              colors.reset
            );
            progress = progress + 1;
            if (progress === routes.length) {
              archive.finalize();
              resume();
            }
          }
        });

        // log
        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hour = ('0' + now.getHours()).slice(-2);
        const minute = ('0' + now.getMinutes()).slice(-2);
        const second = ('0' + now.getSeconds()).slice(-2);

        const log = text.startsWith('[')
          ? `${year}-${month}-${day} ${hour}:${minute}:${second} Creating backup of /${route} was successful.\n`
          : `${year}-${month}-${day} ${hour}:${minute}:${second} ERROR Creating backup of /${route} failed.\n`;

        fs.appendFile(`${dir}/${backupTime}/backup.log`, log, function () {});
      });
  });
};

// resume
const resume = () => {
  output.on('close', function () {});
  archive.pipe(output);

  if (errorCounter > 0) {
    console.log(
      colors.red,
      `\n Backup completed with ${errorCounter} ${
        errorCounter === 1 ? 'error' : 'errors'
      }!`,
      colors.reset,
      `For details have a look at the log file: ${dir}/${backupTime}/backup.log`
    );
  } else {
    console.log(
      colors.green,
      `\n Backup completed without errors!`,
      colors.reset,
      `For details have a look at the log file: ${dir}/${backupTime}/backup.log\n`
    );
  }
};

createDirectories();

const output = fs.createWriteStream(
  `${dir}/${backupTime}/${process.env.API_NAME || 'api'}--${backupTime}.zip`
);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

createBackup();
