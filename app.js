var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const cors = require('cors');
const events = require('./routes/events');
const health = require('./routes/health');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors());

app.use('/api/v1/events', events);
app.use('/', health);


module.exports = app;
