var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var expenseReportRouter = require('./routes/expensereport');
var cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/expensereport', expenseReportRouter);

const uri = "mongodb+srv://7miracle:7miracle@cluster0-5b5py.mongodb.net/7miracle?retryWrites=true";
mongoose.connect(uri, {useNewUrlParser: true});

module.exports = app;
