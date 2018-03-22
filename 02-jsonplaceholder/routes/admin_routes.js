const forms = require('../config/constants');
const uuid = require('uuid/v4');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const model = require('../model').AdminModel;

const serialize = (req, res, next) => {
  model.findOne({id: req.user.id}, (err, admin) => {
    console.log('FROM INSIDE SERIALIZE CB');
    req.user = {
      id: admin.id
    }
    next();
  });
}

const beforeSaving = (req, res, next) => {
  req.user = {
    id: uuid(),
  };
  next();
}

const generateToken = (req, res, next) => {
  req.token = jwt.sign({
    id: req.user.id
  }, 'server secret', {
    expiresIn: 60*60
  });
  next();
}

module.exports = (app, AdminModel, passport) => {

  app.get('/login', (req, res) => {
    res.send(forms.loginForm);

  });

  app.get('/signup', (req, res) => {
    res.send(forms.signupForm);
  });

  app.post('/login',
  passport.authenticate(
    'local', {
      session: false
    }), serialize, generateToken, (req, res) => {
      AdminModel.findOneAndUpdate(
        {id: req.user.id}, {token: req.token}, {
          upsert: true,
          runValidators: true,
          new: true
        }, (err, updatedAdmin) => {
          if (err)  console.error(err);
        });
      res.status(200).json({
        user: req.user,
        token: req.token
      });
    }
  );

  app.post('/signup', beforeSaving, generateToken, (req, res) => {
    const admin = new AdminModel(req.body);
    admin.id = req.user.id;
    admin.password = md5(admin.password);
    admin.token = req.token;
    admin.save((err, admin) => {
      if (err)  console.error(err);
      else {
        console.log('New admin has been saved');
        res.redirect(`/?access_token=${admin.token}`);
      }
    })

  })
}
