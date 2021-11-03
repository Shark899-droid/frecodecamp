var express = require('express');
var app = express();
require('dotenv').config();

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    let message = { message: 'HELLO JSON' };
    res.json(message);
  } else {
    let message = { message: 'hello json' };
    res.json(message);
  }
});

app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

app.get('/name', (req, res) => {
  res.json({ name: `${req.query.firstname} ${req.query.lastname}` });
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

module.exports = app;
