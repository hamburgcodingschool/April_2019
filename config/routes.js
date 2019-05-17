const DestinationController = require('./../src/Controller/DestinationController');

module.exports.setupRoutes = function(app){
    app.get('/', function (req, res) {
        res.render("home", {
            name: "Was du willst"
        });
    });

    app.get('/api/destination', DestinationController.apiGetDestinations);

    app.get('/api/destination/:id', DestinationController.apiGetDestination);

};