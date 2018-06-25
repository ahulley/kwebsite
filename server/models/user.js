const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

//before save
userSchema.pre('save', function (next) {
  const user = this;

  //generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    //hash (encrypt) password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      //overwrite plaintext pw with encrypted pw, next() to go save the model
      //the salt + the pw gets saved as the string in the db
      user.password = hash;
      next();
    });
  });
});

//function available to the user object
userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) {
        reject(err);
      }
      else {
        resolve(isMatch);
      }
    });
  });
}

userSchema.methods.extractIDFromToken = function (token) {
  return new Promise((resolve, reject) => {
    console.log(token);
    result = mongoose.Types.ObjectId(token);
    console.log(result);
  });
}

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
