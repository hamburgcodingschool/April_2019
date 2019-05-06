const Destination = require('./models/destination').model;

require('./bootstrap').initialize().then((app) => {
    app.use(express.static('public'));

    app.get('/api/destination', function (req, res) {
        Destination.find({}, function(err, records){
            if(err){
                res.status(500);
                return res.send();
            }
            res.setHeader('Content-Type', "application/json");
            res.send(JSON.stringify(records));
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
}).catch((err) => {
    console.error.bind(console, 'connection error:');
});
