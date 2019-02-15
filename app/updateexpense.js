var ExpenseReportModel = require('../model/expensereport');
var handlers = require('../Utils/handlers');

class UpdateExpenseReport {
    /* Add if it is new expense list */
    AddNewExpense(month, request, res) {
        try {
            var query = ExpenseReportModel.findOne({ month: month });
            query.then(function (expensereport) {
                if (expensereport) {
                    expensereport.totalexpense = parseInt(expensereport.totalincome) + parseInt(request.Amount);
                    expensereport.expensedetails.push(request);
                    expensereport.save().then(doc => { handlers.HandleResponse(doc, res) })
                        .catch(err => { handlers.HandleError(err, res) });
                }
            }).catch(err => { HandleError(err, res) });
        } catch (e) {
            handlers.HandleInternalError(e, res);
        }
    }
    /* Query and update the expense amount */
    updateReport(req, res) {
        try {
            var obj = this;
            var date = req.date;
            if (!date) {
                date = new Date();
            }
            var request = req.body;
            var month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
            ExpenseReportModel.updateOne(
                { 'expensedetails.Name': request.Name, 'month': month },
                { '$inc': { 'expensedetails.$.Amount': request.Amount, 'totalexpense': request.Amount } },
            ).then(expensereport => {
                if (expensereport.nModified == 0) {
                    obj.AddNewExpense(month, request, res);
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

module.exports = new UpdateExpenseReport();