const express = require('express');

function setupViewEngine(app){
    var exphbs  = require('express-handlebars');

    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');
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