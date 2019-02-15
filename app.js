var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var expenseReportRouter = require('./routes/expensereport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/expensereport', expenseReportRouter);


mongoose.connect('mongodb://localhost:27017/7miracle', {useNewUrlParser: true});

module.exports = app;
