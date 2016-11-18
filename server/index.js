//Main starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// App setup

// Server setup
const port = process.env.PORT || 3090;
