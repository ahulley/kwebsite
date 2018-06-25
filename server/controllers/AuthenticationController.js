const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
  if (!validateSignupFields(req.body, res)) {
    return;
  }

  //htxtps://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
  //and/or differences
  User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).exec()
    .then((existingUser) => {
      if (existingUser) {
        res.status(422).send({ error: 'Email or Username is already in use' });
        throw new Error('Error signing up');
      }
    })
    .then(() => { return buildModel(req.body); })
    .then((userModel) => { return userModel.save(); })
    .then((userModel) => { res.json({ token: tokenForUser(userModel) }); })
    .catch((err) => {
      return next(err);
    });
}

//Copid from UI checks
function validateSignupFields({ email, username, password }, res) {
  err = '';

  if (!email || !username || !password) {
    err = 'You must provide an email, username, and password';
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    err = 'Invalid email';
  }
  else if (username.length < 6) {
    err = 'Invalid username';
  }
  else if (password.length < 8 || !/\d/.test(password) || !/\W+/.test(password)) {
    err = 'Invalid password';
  }

  if (err) {
    res.status(422).send({ error: err });
    return false;
  }
  return true;
}

function buildModel({ email, username, password }) {
  console.log('builduser()');
  return new User({
    email: email,
    username: username,
    password: password
  });
}

exports.signin = function (req, res, next) {
  //at this point, the user has had email and pwd auth'd, just need to return there token
  res.send({ token: tokenForUser(req.user) });
}
