var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

let Destination = require('./models/destination').model;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/travelBlog', {useNewUrlParser: true});

var mongooseDb = mongoose.connection;
mongooseDb.on('error', console.error.bind(console, 'connection error:'));

mongooseDb.once('open', function() {
    app.use(express.static('public'));

    app.get('/', function (req, res) {
        res.render("home", {
            name: "Was du willst"
        });
    });

    app.get('/api/destination', function (req, res) {
        Destination.find({}, function(err, records){
            if(err){
                res.status(500);
                return res.send();
            }
            res.setHeader('Content-Type', "application/json");
            res.send(JSON.stringify({"test": 1}));
        });
    });

    app.get('/api/destination/:id', function (req, res) {
        Destination.findById(req.params.id, function(err, record){
            if(err){
                res.status(500);
                return res.send();
            }
            res.setHeader('Content-Type', "application/json");
            res.send(JSON.stringify(record));
        });
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
});


