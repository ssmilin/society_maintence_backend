const expensereportschema = require('../model/expensereport');
const handlers = require('../Utils/handlers');
const mongoose = require('mongoose');

class AddNewExpense {
    constructor(request, response) {
        this.request = request.body;
        this.response = response;
        this.ExpenseReportModel = mongoose.model(this.request.societyname+ "Members", expensereportschema);
    }
    /*
        This method will create new report, if report already exist for the 
        current month, it return message "Report already exist"
    */
    addNewReport() {
        try {
            var date = this.request.date;
            if (!date) {
               date = new Date();
            }
            var month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
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
}
module.exports = AddNewExpense;
/*
Sample test input
http://localhost:3000/expensereport/addnewreport
{
    "societyname":"Greenpark"
}
*/