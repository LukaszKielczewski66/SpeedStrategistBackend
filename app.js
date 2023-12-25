const express = require('express');
const session = require('express-session');
const { sessionKeySecret } = require('./config');
const app = express();

require('./db/mongoose');

app.use(session({
    secret: sessionKeySecret,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./middleware/view-variables-middleware'));
// app.use('/', require('./middleware/user-middleware'));

app.use('/api', require('./routes/api'));

module.exports = app;