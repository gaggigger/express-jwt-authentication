const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password
userSchema.pre('save', encryptPassword);

function encryptPassword(next) {
  const user = this;

  bcrypt.genSalt(10, saltCallback(user, next));
}

function saltCallback(user, next) {
  return function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, hashCallback(user, next));
  }
}

function hashCallback(user, next) {
  return function(err, hash) {
    if (err) { return next(err); }

    user.password = hash;
    next();
  }
}


// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
