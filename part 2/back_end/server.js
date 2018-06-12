var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var jwtConf = require('./util/jwt')
var db = require('./util/dbConf')

mongoose.connect(db.url)
  .then(() => console.log('DB connection succesful'))
  .catch((err) => console.error('DB error: '+err));

var corsOptions = {
  origin: '*',
  methods: 'GET,POST'
}
var restaurant = require('./routes/restaurant');
var user = require('./routes/user')
var auth = require('./routes/auth')
var collection = require('./routes/collection')
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(cors(corsOptions))

app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization) {
    var auth = req.headers.authorization
    jwtConf.verify(auth, function (error, user) {
      req.user = undefined
      if (user) {
        req.user = user
      }
      next()
    })
  } else {
    req.user = undefined
    next()
  }
})

app.use('/api/restaurant', restaurant);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/collection', collection)

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  if (err) {
    res.status(404).json(error)
  } else {
    next();
  }
});

module.exports = app;