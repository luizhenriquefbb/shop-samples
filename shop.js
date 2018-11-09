var express            = require('express');
var app                = express();
var bodyParser         = require('body-parser');
var multer             = require('multer');
var cookieParser       = require('cookie-parser');
var session            = require('express-session');
const path             = require('path');
const { createEngine } = require('express-react-views');

// Configurar sessao para os usuarios   
app.use(session({
    secret: 'qA5JrwUCTZuqTAEPEZMhaMWq',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000000 } }));


app.set('views', path.resolve('./views'));
app.set('view engine', 'jsx'); 
app.engine('jsx', createEngine()); 

var admin = require('./routes/admin');
var index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multer({ dest: 'public/tmp'}));

app.use(express.static('public'));

app.use('/admin', admin);
app.use('/', index);

module.exports = app;