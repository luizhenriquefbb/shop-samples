var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookie = require('cookie-parser');
var session  = require('express-session'),
    RedisStore = require('connect-redis')(session);
    
app.use(session({store: new RedisStore({'host':config.redisHost, 'port':6379}),
    secret: 'qA5JrwUCTZuqTAEPEZMhaMWq',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 } }));


var admin = require('./routes/admin');

app.engine('handlebars',exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: 'public/tmp'}));

app.use(express.static('public'));

app.use('/admin', admin);
app.use('/',admin);

module.exports = app;