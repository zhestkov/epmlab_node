const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
// const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local');
const schemas = require('./model');
const config = require('./config');
const fetchData = require('./fetchingData');
const initDB = require('./model/db');
const models = require('./model');

const app = express();
// middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

// passport.use(new BearerStrategy(
//   function(token, done) {
//     models.AdminModel.findOne({ token: token }, function (err, admin) {
//       console.log('FROM findOne() method of AdminModel');
//       if (err) { return done(err); }
//       if (!admin) { return done(null, false); }
//       return done(null, admin, { scope: 'all' });
//     });
//   }
// ));

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.AdminModel.findOne({
      username,
      password
    }, (err, admin) => {
      if (err) { return done(err); }
      if (!admin) { return done(null, false); }
      return done(null, admin);
    })
  })
);

// initial data arrays
const INITIAL_USERS = [];
const INITIAL_POSTS = [];
const INITIAL_COMMENTS = [];

fetchData(config.FETCHING_BASE_URI, INITIAL_USERS, INITIAL_POSTS, INITIAL_COMMENTS)
  .then(() => initDB(config.DATABASE_URI, INITIAL_USERS, INITIAL_POSTS, INITIAL_COMMENTS))
  .then(() => require('./routes')(app, models, passport));


app.listen(config.PORT, () => {
  console.log(`Server is started at ${config.PORT} port`);
});
