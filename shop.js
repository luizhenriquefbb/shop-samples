var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session  = require('express-session');
var RedisStore = require('connect-redis')(session);

// Configurar sessao para os usuarios   
app.use(session({
    secret: 'qA5JrwUCTZuqTAEPEZMhaMWq',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000000 } }));


//Adicionar rota admin
var admin = require('./routes/admin');

app.engine('handlebars',exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multer({ dest: 'public/tmp'}));

app.use(express.static('public'));

//Configurar rotas admin
app.use('/', admin);

module.exports = app;