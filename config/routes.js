const DestinationController = require('./../src/Controller/DestinationController');
const SignupController = require('./../src/Controller/SignupController');
let passport = require('passport');

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

  app.post('/api/get-token', (req, res) =>
    passport.authenticate('jwt', { session: false })
  );

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
