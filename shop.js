var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var shop = require('./routes/index');

app.engine('handlebars',exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/admin', admin);
app.use('/',shop);

module.exports = app;