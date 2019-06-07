require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const exSession = require('express-session');
const cookieParse = require('cookie-parser');
const ConPgSimple = require('connect-pg-simple')(exSession);
const passport = require('passport');
const flash = require('connect-flash');
const dbcon = require('./db/dbcon');

const index = require('./api/index/indexController');
const users = require('./api/user/userController');

const app = express();

/* Uncomment when start to use static files
const staticFilesPath = path.resolve(__dirname, 'assets');
app.use(express.static(staticFilesPath)); */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse(process.env.PORTAL_SECRET));
app.use(exSession({
  secret: process.env.PORTAL_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
    httpOnly: false,
    secure: false,
  },
  store: new ConPgSimple({
    pool: dbcon,
    tableName: 'session',
  }),
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/users', users);

module.exports = app;
