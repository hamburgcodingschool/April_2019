var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/api/marker', function (req, res) {
    const jsonData = {
        "test": {
            "bla": 11111
        }
    };
    res.setHeader('Content-Type', "application/json");
    res.send(JSON.stringify(jsonData));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});