var express = require('express');
var router = express.Router();
var addnewexpense = require('../app/addnewexpense');
var updateexpense = require('../app/updateexpense');
var updateincome = require('../app/updateincome');

/* Add New Report. */
router.post('/addnewreport', function (req, res, next) {
    addnewexpense.addNewReport(req, res);
});

/* Add Expense Details. */
router.post('/addexpense', function (req, res, next) {
    updateexpense.updateReport(req, res);
});

/* Add Expense Details. */
router.post('/addincome', function (req, res, next) {
    updateincome.updateReport(req, res);
});

module.exports = router;
