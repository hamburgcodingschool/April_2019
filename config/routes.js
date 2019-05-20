const DestinationController = require('./../src/Controller/DestinationController');
const SignupController = require('./../src/Controller/SignupController');
let passport = require('passport');
const User = require('../models/user').model;
const jwt = require('jsonwebtoken');

function authenticationMiddleware() {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
}

module.exports.setupRoutes = function(app) {
  app.get('/', authenticationMiddleware(), function(req, res) {
    res.render('home', {
      name: 'This is the home page'
    });
  });

  app.post('/login', (req, res) =>
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })(req, res)
  );

  app.post('/api/get-token', async (req, res) => {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password
    });
    if (user) {
      try {
        const token = await jwt.sign(
          {
            userId: user._id
          },
          'secret',
          { expiresIn: 60 * 60 }
        );
        res.json(token);
      } catch (error) {
        console.log(error);
      }
    }
  });

  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.get('/signup', function(req, res) {
    res.render('signup');
  });

  app.post('/signup', SignupController.createUser);

  app.get('/api/destination', DestinationController.apiGetDestinations);

  app.get('/api/destination/:id', DestinationController.apiGetDestination);
};
