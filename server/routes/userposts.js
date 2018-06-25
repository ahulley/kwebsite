const UserPost = require('../models/UserPost');

module.exports = (app) => {
  app.get('/userposts', (req, res, next) => {
    UserPost.find()
      .exec()
      .then((userpost) => res.json(userpost))
      .catch((err) => next(err));
  });

  app.post('/userposts', function (req, res, next) {
    const userPost = new UserPost({
      users_id: "ahulley",
      title: req.body.title,
      description: req.body.description
    });

    userPost.save()
      .then((userPost) => res.json())
      .catch((err) => next(err));
  });

};
