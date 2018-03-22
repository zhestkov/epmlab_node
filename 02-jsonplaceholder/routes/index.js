const userRoutes = require('./user_routes');
const postRoutes = require('./post_routes');
const commentRoutes = require('./comment_routes');
const adminRoutes = require('./admin_routes');
const pages = require('../config/constants');
const PORT = require('../config').PORT;
module.exports = (app, models, passport) => {
  const { UserModel, PostModel, CommentModel, AdminModel } = models;
  userRoutes(app, UserModel, passport);
  postRoutes(app, PostModel, passport);
  commentRoutes(app, CommentModel, passport);
  adminRoutes(app, AdminModel, passport);

  (function root(app) {
    app.get('/', (req, res) => {
      req.query['access_token'] ? res.send(pages.mainAfterAuth) :
      res.send(pages.mainBeforeAuth);

    });
  })(app);
}
