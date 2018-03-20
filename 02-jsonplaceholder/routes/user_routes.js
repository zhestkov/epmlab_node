module.exports = (app, UserModel) => {

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findUserById(id, (err, user) => {
      res.send(user);
    });
  });

  app.get('/users', (req, res) => {
    if (req.query['name']) {
      UserModel.findUserByName(req.query['name'], (err, user) => {
        res.send(user);
      });
    } else {
      UserModel.find().exec((err, users) => {
        if (err)  console.error(err);
        else {
          res.send(users);
        }
      });
    }
  });

  app.post('/users/new', (req, res) => {
    const user = new UserModel(req.body);
    user.save((err, user) => {
      if (err)  console.error(err);
      else {
        res.send('New user has been saved to DB successfully');
      }
    });
  });

  app.post('/users/update', (req, res) => {
    const { id } = req.body;
    if (id) {
      UserModel.findOneAndUpdate(
        { id: id }, req.body,{
          upsert: true,
          runValidators: true,
          new: true
        }, (err, updatedUser) => {
          if (err)  console.error(err);
          else {
            res.send(updatedUser);
          }
        });
    } else {
      res.send(`Something goes wrong. ID is undefined`);
    }
  });

  app.post('/users/remove', (req, res) => {
    const { id } = req.body;
    if (id) {
      UserModel.findOneAndRemove({id}, (err, user) => {
        if (err)  console.error(err);
        else {
          res.write(`User with ID=${id} has been removed successfully:\n`);
          res.write(`${user}`);
          res.end();
        }
      });
    }
  });
}
