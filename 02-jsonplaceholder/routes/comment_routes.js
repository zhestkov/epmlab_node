module.exports = (app, CommentModel) => {

  app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    CommentModel.findCommentById(id, (err, comment) => {
      if (err)  console.error(err);
      else {
        res.send(comment);
      }
    });
  });

  app.get('/comments', (req, res) => {
    if (req.query['postId']) {
      CommentModel.findCommentByPostId(req.query['postId'], (err, comments) => {
        if (err)  console.error(err);
        else {
          res.send(comments);
        }
      });
    } else {
      CommentModel.find().exec((err, comments) => {
        if (err)  console.error(err);
        else res.send(comments);
      });
    }
  });

  app.post('/comments/new', (req, res) => {
    const comment = new CommentModel(req.body);
    comment.save((err, comment) => {
      if (err)  console.error(err);
      else {
        res.write('New comment has been successfully added to DB:\n');
        res.write(`${comment}`);
        res.end();
      }
    });
  });

  app.post('/comments/update', (req, res) => {
    const { id } = req.body;
    if (id) {
      CommentModel.findOneAndUpdate(
        { id: id }, req.body,{
          upsert: true,
          runValidators: true,
          new: true
        }, (err, updatedComment) => {
          if (err)  console.error(err);
          else {
            res.send(updatedComment);
          }
        });
    } else {
      res.send(`Something goes wrong. ID has not been found in request`);
    }
  });

  app.post('/comments/remove', (req, res) => {
    const { id } = req.body;
    if (id) {
      CommentModel.findOneAndRemove({id}, (err, comment) => {
        if (err)  console.error(err);
        else {
          res.write(`Comment with ID=${id} has been removed successfully:\n`);
          res.write(`${comment}`);
          res.end();
        }
      });
    } else {
      res.send(`Something goes wrong. ID has not been found in request`);
    }
  });
}
