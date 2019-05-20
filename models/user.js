var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports.model = mongoose.model('User', userSchema);
