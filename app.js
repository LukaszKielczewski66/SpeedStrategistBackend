const express = require('express');
const path = require('path');
const app = express();

require('./db/mongoose');

app.use('/api', require('./routes/api'));

module.exports = app;