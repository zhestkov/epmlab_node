const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret : 'server secret'});

module.exports = (app, PostModel) => {

  app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    PostModel.findPostById(id, (err, post) => {
      if (err)  console.error(err);
      else {
        res.send(post);
      }
    });
  });

  app.get('/posts', (req, res) => {
    if (req.query['userId']) {
      PostModel.findPostByUserId(req.query['userId'], (err, posts) => {
        if (err)  res.send('Authorization error');
        else {
          res.send(posts);
        }
      });
    } else {
      PostModel.find().exec((err, posts) => {
        if (err)  console.error(err);
        else {
          res.send(posts);
        }
      });
    }
  });

  app.post('/posts/new', authenticate,  (req, res) => {
    const post = new PostModel(req.body);
    post.save((err, post) => {
      if (err)  console.error(err);
      else {
        res.write('New post has been added to DB successfully:\n');
        res.write(`${post}`);
        res.end();
      }
    });
  });

  app.post('/posts/update', authenticate, (req, res) => {
    const { id } = req.body;
    if (id) {
      PostModel.findOneAndUpdate(
        {id}, req.body, {
          upsert: true,
          runValidators: true,
          new: true
        }, (err, updatedPost) => {
          if (err)  console.error(err);
          else res.send(updatedPost);
        });
    } else {
      res.send(`Something goes wrong. ID has not been found in request`);
    }
  });

  app.post('/posts/remove', (req, res) => {
    const { id } = req.body;
    if (id) {
      PostModel.findOneAndRemove({ id }, (err, post) => {
        if (err)  console.error(err);
        else {
          res.write(`Post with ID=${id} has been removed successfully:\n`);
          res.write(`${post}`);
          res.end();
        }
      });
    } else {
      res.send(`Something goes wrong. ID has not been found in request`);
    }
  });
}
