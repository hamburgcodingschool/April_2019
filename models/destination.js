var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let destinationSchema = new Schema({
    name: String,
    description: String,
    images: [{ url: String }],
    position: { latitude: Number, longitude: Number },
    userName: String,
    continent: String
});

module.exports.model = mongoose.model('Destination', destinationSchema);