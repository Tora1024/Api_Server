//Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); //Used for parsing incoming request, JSON in this case
const morgan = require('morgan'); //logging framework, mostly just for debugging.
const mongoose = require('mongoose');

const app = express();
const router = require('./router');

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
/* These two serves as middleware, kind of a filther like */
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server is now listening', port);
