const express = require('express');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

function setupViewEngine(app){
    var exphbs  = require('express-handlebars');

    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');
}

function setupSecurity(app){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, {username: "admin", id: 1});
    });

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        function(username, password, done) {
            if(username === "admin" && password === "test"){
                return done(null, {username: "admin", id: 1});
            }

            return done(null, false, { message: 'Incorrect credentials.' });
        }
    ));
}
async function setupDatabase(){
    return new Promise(function(resolve, reject){
        var mongoose = require('mongoose');
        mongoose.connect('mongodb+srv://test:test@cluster0-rjyhd.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

        var mongooseDb = mongoose.connection;
        mongooseDb.on('error', reject);
        mongooseDb.once('open', resolve);
    });
}

module.exports.start = function(){
  return new Promise(function(resolve, reject){
      let app = express();


      app.use(cookieParser());
      app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

      app.use(session({
          secret: 'dfjkgndiungdifngiednfgidunguidfguidnugdifg'
      }));
      app.use(flash());

      setupSecurity(app);

      setupViewEngine(app);

      setupDatabase().then(() => {
          return resolve(app);
      }).catch((err) => {
         console.log(err);
      });
  });
};

module.exports.setupMiddleware = function(app){
    app.use(express.static('public'));
    return app;
};