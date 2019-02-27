const expensereportschema = require('../model/expensereport');
const handlers = require('../Utils/handlers');
const mongoose = require('mongoose');

class UpdateExpenseReport{
    constructor(request, response) {
        this.request = request.body;
        this.response = response;
        this.ExpenseReportModel = mongoose.model(this.request.societyname+ "expensereport", expensereportschema);
    }
    /* Add if it is new expense list */
    addNewReport(month) {
        try {
            var query = this.ExpenseReportModel.findOne({ month: month });
            var request = this.request;
            query.then(function (expensereport) {
                if (expensereport) {
                    expensereport.totalexpense = parseInt(expensereport.totalexpense) + parseInt(request.amount);
                    expensereport.expensedetails.push(request);
                   return expensereport.save();
                }
            }).then(doc => {
                handlers.HandleResponse(doc, this.response);
            }).catch(err => { HandleError(err, this.response) });
        } catch (e) {
            handlers.HandleInternalError(e, this.response);
        }
    }
    /* Query and update the expense amount */
    updateReport() {
        try {
            var date = this.request.date;
            if (!date) {
                date = new Date();
            }
            let request = this.request;
            var month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
            this.ExpenseReportModel.findOneAndUpdate(
                { 'expensedetails.name': request.name, 'month': month },
                { '$inc': { 'expensedetails.$.amount': request.amount, 'totalexpense': request.amount },
                  '$set': {'expensedetails.$.lastupdated': new Date()} },
                {new: true}
            ).then(expensereport => {
                if (!expensereport) {
                    this.addNewReport(month);
                }
                else {
                    return expensereport;
                }
            }).then(doc => {
                handlers.HandleResponse(doc, this.response);
            }).catch(err => { handlers.HandleError(err, this.response) });
        } catch (e) {
            handlers.HandleInternalError(e, this.response);
        }
    }
}

module.exports = UpdateExpenseReport;
/*
http://localhost:3001/expensereport/addexpense
{
	"societyname":"Greenpark",
	"name":"Security",
	"amount":"8"
}

*/