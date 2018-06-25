/*const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname).forEach((file) => {
    if (file != 'index.js') {
      require(`./${file.substr(0, file.indexOf('.'))}`)(app);
    }
  });
};
*/

const AuthenticationController = require('../controllers/AuthenticationController');
const passportService = require('../services/passport');
const passport = require('passport');

//session: false, we dont want a cookie based session
const requireAuth = passport.authenticate('jwt', { session: false });

const userRoutes = require('./users');

module.exports = function (app) {
  //Auth'd request -> verify token -> resource access
  //Signing in -> verify email/pw -> token
  //Signing up -> verify email is not in use -> token


  //.get.... call functions can be "A series of middleware functions (separated by commas)."
  /*app.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there' });
  });*/
  app.post('/signup', AuthenticationController.signup);
  app.post('/signin', function (req, res, next) {
    passport.authenticate('local', { session: false }, function (err, user) {
      if (user) {
        req.user = user;
        AuthenticationController.signin(req, res, next);
      }
      else if (err) {
        res.status(422).send({ error: err.message });
      }
    })(req, res, next);
  });



  app.post('/userprofile', requireAuth);

  userRoutes(app);
}
