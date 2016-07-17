const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'), //parsing json
      morgan = require('morgan'), //Logging
      router = require('./router'),
      app = express(),
      cors = require('cors'),
      mongoose = require('mongoose');

//DB Setup
mongoose.connect('mongodb://localhost:local/auth');

// App Setup - Middleware
app.use(morgan('combined'));
app.use(cors())
app.use(bodyParser.json({type: '*/*'}));

// Set up Router
router(app);

//Server Setup
const port = process.env.PORT || 3090,
      server = http.createServer(app);

server.listen(port);

console.log(`Server listening on ${port}`);
