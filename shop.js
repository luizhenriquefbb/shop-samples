var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');

console.log("Comasdasdasd");

//var shop = require('./routes/index');
var admin = require('./routes/admin');

app.engine('handlebars',exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: 'public/tmp'}));

app.use(express.static('public'));

app.use('/admin', admin);
//app.use('/',shop);

module.exports = app;