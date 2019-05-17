const config = require('./config/config.json');
const bootstrapping = require("./config/bootstrap");
const routing = require('./config/routes');

bootstrapping.start().then((app) => {
    bootstrapping.setupMiddleware(app);

    routing.setupRoutes(app);

    app.listen(config.port, function () {
        console.log('Example app listening on port 3000!');
    });
});


