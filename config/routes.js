const DestinationController = require('./../src/Controller/DestinationController');
let passport = require('passport');

function authenticationMiddleware () {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    }
}

module.exports.setupRoutes = function(app){
    app.get('/', authenticationMiddleware(), function (req, res) {
        res.render("home", {
            name: "Was du willst"
        });
    });

    app.post('/login', (req, res) => passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', })(req, res));

    app.get('/login', function (req, res) {
        res.render("login");
    });

    app.get('/api/destination', DestinationController.apiGetDestinations);

    app.get('/api/destination/:id', DestinationController.apiGetDestination);
};