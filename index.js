const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express();

// App Setup


//Server Setup
const port = process.env.PORT || 3090,
      server = http.createServer(app);

server.listen(port);

console.log(`Server listening on ${port}`);
