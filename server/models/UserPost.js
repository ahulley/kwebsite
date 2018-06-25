const mongoose = require('mongoose');

const UserPostSchema = new mongoose.Schema({
  users_id: {
    type: String,
    default: ""
    },
  title: {
    type: String,
    default: ""
    },
  description: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('UserPost', UserPostSchema);
