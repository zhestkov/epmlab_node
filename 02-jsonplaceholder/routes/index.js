const userRoutes = require('./user_routes');
const postRoutes = require('./post_routes');
const commentRoutes = require('./comment_routes');

module.exports = (app, models) => {
  const { UserModel, PostModel, CommentModel } = models;
  userRoutes(app, UserModel);
  postRoutes(app, PostModel);
  commentRoutes(app, CommentModel);
  (function root(app) {
    app.get('/', (req, res) => {
      res.send('Welcome to mainpage!');
    });
  })(app);
}
