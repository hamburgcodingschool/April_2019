const express = require('express');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const User = require('../models/user').model;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

function setupViewEngine(app) {
  var exphbs = require('express-handlebars');

  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');
}

function setupSecurity(app) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, { username: 'admin', id: 1 });
  });

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async function(username, password, done) {
      let isEqaul;
      let user;
      try {
        user = await User.findOne({ username });
        isEqual = await bcrypt.compare(password, user.password);
      } catch (err) {
        console.log(err);
      }

      if (username === user.username && isEqual) {
        return done(null, { username: 'admin', id: 1 });
      }

      return done(null, false, { message: 'Incorrect credentials.' });
    })
  );

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ id: jwt_payload.sub }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
}
async function setupDatabase() {
  return new Promise(function(resolve, reject) {
    var mongoose = require('mongoose');
    mongoose.connect(
      'mongodb+srv://test:test@cluster0-rjyhd.mongodb.net/test?retryWrites=true',
      { useNewUrlParser: true }
    );

    var mongooseDb = mongoose.connection;
    mongooseDb.on('error', reject);
    mongooseDb.once('open', resolve);
  });
}

module.exports.start = function() {
  return new Promise(function(resolve, reject) {
    let app = express();

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    app.use(
      session({
        secret: 'dfjkgndiungdifngiednfgidunguidfguidnugdifg'
      })
    );
    app.use(flash());

    setupSecurity(app);

    setupViewEngine(app);

    setupDatabase()
      .then(() => {
        return resolve(app);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports.setupMiddleware = function(app) {
  app.use(express.static('public'));
  return app;
};
