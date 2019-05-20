const User = require('../../models/user').model;
const bcrypt = require('bcryptjs');

module.exports.createUser = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await User.create({
    username,
    email,
    password: hashedPassword
  });
  console.log(result);
  res.redirect('/login');
};
