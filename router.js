const Authentication = require('./controllers/authentication'),
      passportService = require('./services/passport'),
      passport = require('passport'),
      requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {

  app.get('/', requireAuth, (req, res) => res.send({hi: 'there'}));

  app.post('/signup', Authentication.signup);

}
