const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/travelBlog', {useNewUrlParser: true});

const mongooseDb = mongoose.connection;

module.exports.initialize = function(){
    return new Promise(function(resolve, reject) {
        mongooseDb.once('open', function() {
            const app = express();
            resolve(app);
        });

        mongooseDb.on('error', reject);
    });
};