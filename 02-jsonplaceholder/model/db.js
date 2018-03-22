const mongoose = require('mongoose');
const models = require('./index');
const credentials = require('../config').credentials;
const { CommentModel, PostModel, UserModel, AdminModel } = models;

const initDB = (db_uri, users, posts, comments) => {
  mongoose.connect(db_uri);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('CONNECTED to DATABASE');
    // create Admin
    const admin = new AdminModel(credentials);
    admin.save((err, admin) => {
      err? console.error(err) : console.log('Admin crendentials have been saved. See config/index.js file');
    });


    UserModel.insertMany(users, (err, users) => {
      if (err)  console.error(err);
      else {
        console.log('Initial users have been added to DB successfully');
      }
    });
    PostModel.insertMany(posts, (err, posts) => {
      if (err) console.error(err);
      else {
        console.log('Initial posts have been added to DB successfully');
      }
    });

    CommentModel.insertMany(comments, (err, comments) => {
      if (err) console.error(err);
      else {
        console.log('Initial comments have been added to DB successfully');
      }
    });
  });
  const gracefulExit = () => {
    db.close(() => {
      console.log('\nConnection with DB is disconnected through app termination');
      process.exit(0);
    });
  }
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
}
module.exports = initDB;
