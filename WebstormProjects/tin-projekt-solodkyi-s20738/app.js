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
const userApiRouter = require('./routes/api/UserApiRoute');
const authUtils = require('./util/authUtils');
const zakupyApiRouter = require('./routes/api/ZakupyApiRepository');
const cors = require('cors');
const session = require('express-session')
var app = express();
const authApiRouter = require('./routes/api/AuthApiRoute')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(session({
  secret:'my_secret_password',
  resave: false
}));

app.use((req,res,next) =>
{
  const  loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if (!res.locals.loginError)
  {
    res.locals.loginError = undefined;
  }
  next();
})
app.use(cookieParser('secret'));
const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});
app.use(i18n.init);
app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/klients', klientRouter);
app.use('/skleps', sklepRouter);
app.use('/zakups', zakupyRouter);
app.use('/api/klients',klientApiRouter);
app.use('/api/skleps',sklepApiRouter);
app.use('/api/user',userApiRouter);
app.use('/api/zakups',zakupyApiRouter);
app.use('/api/auth',authApiRouter)


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'skleps' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
