const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'), //parsing json
      morgan = require('morgan'), //Logging
      router = require('./router'),
      app = express();

// App Setup - Middleware
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

//Server Setup
const port = process.env.PORT || 3090,
      server = http.createServer(app);

server.listen(port);

console.log(`Server listening on ${port}`);
