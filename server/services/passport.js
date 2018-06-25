const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localLogin = new LocalStrategy({ usernameField: 'username' }, function (username, password, done) {
  console.log('hit the local login');
  let user;

  User.findOne({ $or: [{ email: username }, { username: username }] }).exec()
    .then((userFound) => {
      if (!userFound) {
        throw new Error('Username or email doesn\'t exist');
      }
      user = userFound;
    })
    .then(() => {
      return user.comparePassword(password);
    })
    .then((isMatch) => {
      if (isMatch) {
        return done(null, user);
      }
      throw new Error('Invalid password');
    })
    .catch((err) => {
      console.log('returning err', err);
      return done(err);
    });
});

//setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  console.log('DOING A JWT LOGIN');
  //if the user id in the payload exists in db
  User.findById(payload.sub, function (err, user) {
    if (err) {
      //the false is what would be the user object but we didnt find one
      return done(err, false);
    }

    if (user) {
      done(null, user);
    }
    else {
      done(null, false);
    }
  });

});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
