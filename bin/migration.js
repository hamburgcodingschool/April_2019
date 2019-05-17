var firebase = require("firebase-admin");
let Destination = require('./../models/destination').model;
var authData = require("./../config/auth.json");

firebase.initializeApp({
    credential: firebase.credential.cert(authData),
    databaseURL: "https://js-for-web-kat.firebaseio.com"
});

var firebaseDb = firebase.firestore();
var destinations = firebaseDb.collection('destinations');

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:test@cluster0-rjyhd.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

var mongooseDb = mongoose.connection;
mongooseDb.on('error', console.error.bind(console, 'connection error:'));

mongooseDb.once('open', function() {
    destinations.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        docs.forEach(mapData);
    });
});

function mapData(destination){
   const destinationData = destination.data();

    destinationData.position = {
        latitude: destinationData.position._latitude,
        longitude: destinationData.position._longitude
    };

   destinationData.images = destinationData.images.map((value, key) => {
       return {url: value}
   });

   let newModel = new Destination(destinationData);

   newModel.save();
}