const Authentication = require('./controllers/authentication');

module.exports = (app) => {

  app.get('/', (req, res, next) => {
    res.send(['apple', 'banana', 'strawberry'])
  });

  app.post('/signup', Authentication.signup);

}
