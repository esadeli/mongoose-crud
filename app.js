var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/books'); // manually added
var customerRouter = require('./routes/customers'); // manually added
var transactionRouter = require('./routes/transactions'); // manually added

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//---------------------------Mongoose connection -----manually added
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library-mongoose', {
  useNewUrlParser : true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    console.log('connected to MongoDb');
})
//---------------------------Mongoose connection -----manually added

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books',bookRouter); // manually added
app.use('/customers',customerRouter) // manually added
app.use('/transactions',transactionRouter) // manually added

// manually added to get data from req.body
app.use(express.urlencoded({extended:false}));
app.use(express.json())

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
  // res.render('error');
});

module.exports = app;
