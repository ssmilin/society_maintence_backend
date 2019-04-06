const express = require('express');
const router = express.Router();
const addnewexpense = require('../app/addnewexpense');
const updateexpense = require('../app/updateexpense');
const updateincome = require('../app/updateincome');
const updatememeber = require('../app/updatemembers');

/* Add New Report. */
router.post('/addnewreport', function (req, res, next) {
    console.log("Given name ", req.body);
    addnewexpenseobj = new addnewexpense(req, res);
    addnewexpenseobj.addNewReport();
});
/* Add New Report. */
router.get('/getmonthlyreport', function (req, res, next) {
    addnewexpenseobj = new addnewexpense(req, res);
    addnewexpenseobj.getMonthlyReport();
});

/* Add Expense Details. */
router.post('/addexpense', function (req, res, next) {
    console.log("Given name ", req.body);
    var updateexpenseObj = new updateexpense(req, res);
    updateexpenseObj.updateReport();
});

/* Add Income Details. */
router.post('/addincome', function (req, res, next) {
    var updateincomeObj = new updateincome(req, res);
    updateincomeObj.updateReport();
});

/* Add New Member. */
router.post('/addmember', function (req, res, next) {
    var updatememeberobj = new updatememeber(req, res);
    updatememeberobj.addNewOwners();
});

/* Update memeber details. */
router.post('/updatemember', function (req, res, next) {
    var updatememeberobj = new updatememeber(req, res);
    updatememeberobj.updateMember();
});

module.exports = router;
