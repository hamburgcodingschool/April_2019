const User = require('../models/user').model;

var mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://test:test@cluster0-rjyhd.mongodb.net/test?retryWrites=true',
  { useNewUrlParser: true }
);

var mongooseDb = mongoose.connection;
mongooseDb.on('error', console.error.bind(console, 'connection error:'));

const createDummyUser = async () => {
  const user = await new User({
    username: 'Patrick',
    email: 'patrick@gmail.com',
    password: 'test'
  });

  await user.save();
};

User.find({ username: 'Patrick' })
  .then(result => console.log(result))
  .catch(err => console.log(err));

createDummyUser();
