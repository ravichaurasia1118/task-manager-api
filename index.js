require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');
var app = express();
var i18n = require("i18n");
const taskRoute = require('./routes/taskRoutes');
const indexRoute = require('./routes/index')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
i18n.configure({
  locales: ["en"],
  directory: path.join(__dirname, "/locales"),
  defaultLocale: "en",
  register: global,
});
app.use(i18n.init);
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//routes define
app.use('/', indexRoute);
app.use('/tasks', taskRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (process.env.MODE == 'development') {
    return res.status(err.status || 500).json({ success: false, message: err.message });
  }
  else {
    return res.status(err.status || 500).json({ success: false, message: err.message });
  }

});

module.exports = app;