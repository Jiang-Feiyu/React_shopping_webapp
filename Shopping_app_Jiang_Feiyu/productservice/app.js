//Author: Jiang Feiyu
//UID: 3035770800
//Assignment-2
//4:52

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');

// connect to db assignment2
var monk = require('monk');
var db = monk('127.0.0.1:27017/assignment2');

var productRouter = require('./routes/product.js');

var app = express();
// app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('jade', require('jade').__express);
app.set("view engine","jade");
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to routers 
app.use(function(req,res,next){
  req.db = db; 
  next();
});

//specify the following CORS options when calling cors(), to allow accepting requests originated from http://localhost:3000
var corsOptions = {
  "origin": "http://localhost:3000", 
  "credentials":true
}

app.use(cors(corsOptions));
app.use('/', productRouter);
//app.get('/', (req, res) => res.send('Hello World!'))
// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development environment
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

  var server = app.listen(3001, function(){
  var host = server.address().address;
  var port = server.address().port;
})