const mongoose = require('mongoose');
const events = require('events');
const express = require('express');
const bodyParser = require('body-parser');
const schemas = require('./model');
const config = require('./config');
const fetchData = require('./fetchingData');
const initDB = require('./model/db');
const models = require('./model');

const eventEmitter = new events.EventEmitter();
const app = express();

// middlewares
app.use(bodyParser.urlencoded({extended: true}));

const INITIAL_USERS = [];
const INITIAL_POSTS = [];
const INITIAL_COMMENTS = [];

fetchData(config.FETCHING_BASE_URI, INITIAL_USERS, INITIAL_POSTS, INITIAL_COMMENTS)
  .then(() => initDB(config.DATABASE_URI, INITIAL_USERS, INITIAL_POSTS, INITIAL_COMMENTS))
  .then(() => require('./routes')(app, models));


app.listen(config.PORT, () => {
  console.log(`Server is started at ${config.PORT} port`);
});
