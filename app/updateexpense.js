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
            console.log("ADD  nEW 1 ", month);
            query.then(function (expensereport) {
                console.log("ADD  nEW 2");
                if (expensereport) {
                    console.log("ADD  nEW 3");
                    expensereport.totalexpense = parseInt(expensereport.totalexpense) + parseInt(request.amount);
                    expensereport.expensedetails.push(request);
                    console.log("ADD  nEW 4");
                   return expensereport.save();
                }
            }).then(doc => {
                handlers.HandleResponse(doc, this.response);
            }).catch(err => { HandleError(err, this.response) });
        } catch (e) {
            console.log("Error ",e);
            handlers.HandleInternalError(e, this.response);
        }
    }
    /* Query and update the expense amount */
    updateReport() {
        try {
            var month = this.request.month;
            if (!month) {
               var date = new Date();
               month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
            }
            let request = this.request;
            //var month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
            this.ExpenseReportModel.findOneAndUpdate(
                { 'expensedetails.name': request.name, 'month': month },
                { '$inc': { 'expensedetails.$.amount': request.amount, 'totalexpense': request.amount },
                  '$set': {'expensedetails.$.lastupdated': new Date()} },
                {new: true}
            ).then(expensereport => {
                console.log("Expense report++");
                if (!expensereport) {
                    console.log("ADD  nEW ");
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
http://localhost:3000/expensereport/addexpense
{
	"societyname":"Greenpark",
	"name":"Security",
	"amount":"8"
}

*/