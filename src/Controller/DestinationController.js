const Destination = require('./../../models/destination').model;

module.exports.apiGetDestinations = function(req, res) {
    Destination.find({}, function(err, records){
        if(err){
            res.status(500);
            return res.send();
        }
        res.setHeader('Content-Type', "application/json");
        res.send(JSON.stringify(records));
    });
};

module.exports.apiGetDestination = function (req, res) {
    Destination.findById(req.params.id, function(err, record){
        if(err){
            res.status(500);
            return res.send();
        }
        res.setHeader('Content-Type', "application/json");
        res.send(JSON.stringify(record));
    });
};