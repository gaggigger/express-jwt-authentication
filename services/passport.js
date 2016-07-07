const passport = require('passport'),
      User = require('../models/user'),
      config = require('../config'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up JWT Strategy
const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Creat Jwt Strategy
const JwtLogin = new JwtStrategy(JwtOptions, (payload, done) => {
  // See if the user id in the payload exists,
  // if it does, call done with the user
  // otherwise call done without a user object
  User.findById(payload.sub, (err, user) => {
    if(err) return done(err, false);

    if(user) {
      done(null, user);
    }
    else {
      done(null, false);
    }
  });
});

// Tell pass port to use this strategy
module.exports = passport.use(JwtLogin);
