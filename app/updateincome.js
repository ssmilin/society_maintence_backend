var ExpenseReportModel = require('../model/expensereport');
var handlers = require('../Utils/handlers');
var mongoose = require('mongoose');

class UpdateIncome {

    buildSubscriptionModel(expensereport, request) {
        var subcriptionObj = {
            'subscriberName': request.name,
            'amount': request.amount
        };
        if (expensereport.incomedetails.subscriptiondetails) {
            expensereport.incomedetails.subscriptiondetails.push(subcriptionObj);
        } else {
            expensereport.incomedetails = { subscriptiondetails: [subcriptionObj] };
        }
    }
    buildOtherIncomeModel(expensereport, request) {
        var otherIncomeObj = {
            'name': request.name,
            'amount': request.amount
        };
        if (expensereport.incomedetails.otherincomedetails) {
            expensereport.incomedetails.otherincomedetails.push(otherIncomeObj);
        } else {
            expensereport.incomedetails = { otherincomedetails: [otherIncomeObj] };
        }
    }
    /* Add if it is new expense list */
    addNewIncome(month, request, res) {
        try {
            var query = ExpenseReportModel.findOne({ month: month });
            var obj = this;
            query.then(function (expensereport) {
                if (expensereport) {
                    expensereport.totalincome = parseInt(expensereport.totalincome) + parseInt(request.amount);
                    if (request.type === 'SUBSCRIPTION') {
                        expensereport.subscriptionpaid = expensereport.subscriptionpaid + 1;
                        obj.buildSubscriptionModel(expensereport, request);
                    }
                    else {
                        obj.buildOtherIncomeModel(expensereport, request);
                    }
                    expensereport.save().then(doc => { handlers.HandleResponse(doc, res) })
                        .catch(err => { handlers.HandleError(err, res) });
                }
            }).catch(err => {handlers.HandleError(err, res) });
        } catch (e) {
            handlers.HandleInternalError(e, res);
        }
    }

    updateReport(req, res) {
        try {
            var date = req.body.date;
            if (!date) {
                date = new Date();
            }
            var obj = this;
            var month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
            var expensereport = new ExpenseReportModel({ month: month });
            var request = req.body;
            var query, update;
            if (request.type === 'SUBSCRIPTION') {
                query = { 'incomedetails.subscriptiondetails.subscriberName': request.name, 'month': month };
                update = { '$inc': { 'incomedetails.subscriptiondetails.$.amount': request.amount, 'totalincome': request.amount } };
            } else {
                query = { 'incomedetails.otherincomedetails.name': request.name, 'month': month };
                update = { '$inc': { 'incomedetails.otherincomedetails.$.amount': request.amount, 'totalincome': request.amount } };
            }
            ExpenseReportModel.updateOne(query, update).then(expensereport => {
                if (expensereport.nModified == 0) {
                    obj.addNewIncome(month, request, res);
                }
                else {
                    handlers.HandleResponse(expensereport, res);
                }
            }).catch(err => { handlers.HandleError(err, res) });
        } catch (e) {
            handlers.HandleInternalError(e, res);
        }
    }
}

module.exports = new UpdateIncome();