const jwt = require('jwt-simple'),
      config = require('../config');

module.exports = (user) => {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
