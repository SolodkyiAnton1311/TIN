var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var klientRouter = require('./routes/klientRouter');
var sklepRouter = require('./routes/sklepRouter');
var zakupyRouter = require('./routes/zakupyRouter');
const klientApiRouter = require('./routes/api/KlientApiRoute');
const sklepApiRouter = require('./routes/api/SklepApiRoute');
const zakupyApiRouter = require('./routes/api/ZakupyApiRepository');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/klients', klientRouter);
app.use('/skleps', sklepRouter);
app.use('/zakups', zakupyRouter);
app.use('/api/klients',klientApiRouter);
app.use('/api/skleps',sklepApiRouter);
app.use('/api/zakups',zakupyApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
