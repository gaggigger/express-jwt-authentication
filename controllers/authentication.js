const jwt = require('jwt-simple'),
      config = require('../config'),
      User = require('../models/user');

function tokenForUser(user) {

  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

const checkIfEmailExists = (res, email, password) => (err, existingUser) => {
  if(err) return next(err);

  // if user email exists, return error
  if(existingUser) {
    return res.status(422).send({error: "email is in use"});
  }

  // if user doesn't exist,
  const user = new User({
    email: email,
    password: password
  });

  user.save(err => {
    if(err) return next(err);

    //Response indicting that the user was saved
    res.json({token: tokenForUser(user)});
  });

};

exports.signup = (req, res, next) => {

  const email = req.body.email,
        password = req.body.password;

  if(!email || !password){
    return res.status(422).send({error: "You must provide email and password"});
  }

  // sees if a user email exists
  User.findOne({ email: email }, checkIfEmailExists(res, email, password));

}
