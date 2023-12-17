const express = require('express');
const path = require('path');
const app = express();

require('./db/mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./middleware/view-variables-middleware'));
// app.use('/', require('./middleware/user-middleware'));

app.use('/api', require('./routes/api'));

module.exports = app;