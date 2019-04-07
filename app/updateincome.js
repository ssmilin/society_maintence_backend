const expensereportschema = require('../model/expensereport');
const handlers = require('../Utils/handlers');
const mongoose = require('mongoose');

class UpdateIncome {
    constructor(request, response) {
        this.request = request.body;
        this.response = response;
        this.ExpenseReportModel = mongoose.model(this.request.societyname + "expensereport", expensereportschema);
    }

    buildSubscriptionModel(expensereport, request) {
        var subcriptionObj = {
            'subscribername': request.name,
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
    addNewReport(month, request, res) {
        try {
            var query = this.ExpenseReportModel.findOne({ month: month });
            query.then(expensereport => {
                if (expensereport) {
                    expensereport.totalincome = parseInt(expensereport.totalincome) + parseInt(request.amount);
                    // build new subdocuments based on subscription type
                    if (request.type === 'SUBSCRIPTION') {
                        expensereport.subscriptionpaid = expensereport.subscriptionpaid + 1;
                        this.buildSubscriptionModel(expensereport, request);
                    }
                    else {
                        this.buildOtherIncomeModel(expensereport, request);
                    }
                    return expensereport.save()
                }
            }).then(doc => { handlers.HandleResponse(doc, res) })
                .catch(err => { handlers.HandleError(err, res) });
        } catch (e) {
            handlers.HandleInternalError(e, res);
        }
    }

    updateReport() {
        try {
            var request = this.request;
            var month = this.request.month;
            if (!month) {
               var date = new Date();
               month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
            }
          //  var month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
            var expensereport = new this.ExpenseReportModel({ month: month });
            var query, update;
            // If type is subscription update subscriptiondetails sub documents, else update otherincomedetails
            if (request.type === 'SUBSCRIPTION') {
                query = { 'incomedetails.subscriptiondetails.subscribername': request.name, 'month': month };
                update = {
                    '$inc': { 'incomedetails.subscriptiondetails.$.amount': request.amount, 'totalincome': request.amount },
                    '$set': { 'incomedetails.subscriptiondetails.$.lastupdated': new Date() }
                };
            } else {
                query = { 'incomedetails.otherincomedetails.name': request.name, 'month': month };
                update = {
                    '$inc': { 'incomedetails.otherincomedetails.$.amount': request.amount, 'totalincome': request.amount },
                    '$set': { 'incomedetails.otherincomedetails.$.lastupdated': new Date() }
                }
            }
            this.ExpenseReportModel.findOneAndUpdate(query, update, { new: true }
            ).then(expensereport => {
                if (!expensereport) {
                    this.addNewReport(month, request, this.response);
                }
                else {
                    handlers.HandleResponse(expensereport, this.response);
                }
            }).catch(err => { handlers.HandleError(err, this.response) });
        } catch (e) {
            handlers.HandleInternalError(e, this.response);
        }
    }
}

module.exports = UpdateIncome;

/*
http://localhost:3001/expensereport/addincome

SUBCRIPTION-Add/update
{
	"name": "test",
	"amount": "2150",
	"type":"SUBSCRIPTION",
	"societyname":"Greenpark"
}

Other income -Add/update
{
	"name": "discount",
	"amount": "2150",
	"societyname":"Greenpark"
}
*/