const expensereportschema = require('../model/expensereport');
const handlers = require('../Utils/handlers');
const mongoose = require('mongoose');

class AddNewExpense {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        console.log("Addd New Expense ", this.request.societyname);
        this.ExpenseReportModel = mongoose.model(this.request.societyname+ "expensereport", expensereportschema);
    }
    /*
        This method will create new report, if report already exist for the 
        current month, it return message "Report already exist"
    */
    addNewReport() {
        try {
            var month = this.request.month;
            if (!month) {
               var date = new Date();
               month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
            }
            var expensereport = new this.ExpenseReportModel({ month: month });
            var query = this.ExpenseReportModel.findOne({ month: month });
            query.then(function (existingReport) {
                if (existingReport) {
                   return new Promise(function(resolve, reject){ resolve('Report already exist');});
                }
                return expensereport.save();
            }).then(doc => { 
                handlers.HandleResponse(doc, this.response) 
            }).catch(err => { 
                handlers.HandleError(err, this.response) 
            })
        } catch (e) {
            handlers.HandleInternalError(e, this.response);
        }
    }
     /*
        This method will create new report, if report already exist for the 
        current month, it return message "Report already exist"
    */
   getMonthlyReport() {
    try {
        var month = this.request.month;
        if (!month) {
           var date = new Date();
           month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
        }
        var expensereport = new this.ExpenseReportModel({ month: month });
        var query = this.ExpenseReportModel.findOne({ month: month });
        query.then(function (existingReport) {
            if (existingReport) {
               return existingReport;
            }
            return new Promise(function(resolve, reject){ resolve('Report does not exist');});
        }).then(doc => { 
            console.log("DOC =", doc);
            handlers.HandleResponse(doc, this.response) 
        }).catch(err => { 
            handlers.HandleError(err, this.response) 
        })
    } catch (e) {
        handlers.HandleInternalError(e, this.response);
    }
}
}
module.exports = AddNewExpense;
/*
Sample test input
http://localhost:3000/expensereport/addnewreport
{
    "societyname":"Greenpark"
}
*/