const User = require('../models/user');
const mongoose = require('mongoose');
const _ = require('lodash');

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

function hideSensitiveInformation(user) {
  user.password = '';
  user.__v = 0;
}

function returnUsers(res, users) {
  if (users.length === 0) {
    res.status(404).send({ error: 'No users found' });
  }
  users.forEach(user => hideSensitiveInformation(user));
  res.json(users);
}

function buildFilter(req) {
  filter = [];
  if (req.query._id) {
    filter = [...filter, { _id: req.query._id }];
  }
  if (req.query.username) {
    filter = [...filter, { username: req.query.username }];
  }
  if (req.query.email) {
    filter = [...filter, { email: req.query.email }];
  }
  return filter;
}

//htxtp://localhost:8080/users?email=q@q.com&username=qusername
exports.find = function (req, res, next) {
  if (!isEmpty(req.query)) {
    findByFilter(req, res, next);
  }
  else {
    findAll(req, res, next);
  }
}

findByFilter = function(req, res, next) {
  User.find({ $and: buildFilter(req) }).exec()
    .then((users) => {
      returnUsers(res, users);
    })
    .catch((err) => {
      return next(err);
    });
}

findAll = function (req, res, next) {
  User.find().exec()
    .then((users) => {
      returnUsers(res, users);
    })
    .catch((err) => {
      return next(err);
    });
}

exports.save = function (req, res, next) {

}

exports.update = function (req, res, next) {

}

exports.delete = function (req, res, next) {

}

function validateSave() {

}
