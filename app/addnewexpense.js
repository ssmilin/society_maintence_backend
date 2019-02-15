var ExpenseReportModel = require('../model/expensereport');
var handlers = require('../Utils/handlers');
var base = require('../app/Base');

class AddNewExpense {
    /*
        This method will create new report, if report already exist for the 
        current month, it return message "Report already exist"
    */
    addNewReport(req, res) {
        try {
            var date = req.body.date;
            if (!date) {
               // date = new Date("28 Aug 2014");
               date = new Date();
            }
            var month = date.toLocaleString('en-us', { month: 'long' }) + date.getFullYear();
            var expensereport = new ExpenseReportModel({ month: month });
            var query = ExpenseReportModel.findOne({ month: month });
            query.then(function (existingReport) {
                if (existingReport) {
                    return res.status(201).send("Report already exist");
                }
                expensereport.save()
                    .then(doc => { handlers.HandleResponse(doc, res) })
                    .catch(err => { handlers.HandleError(err, res) })
            }).catch(err => { handlers.HandleError(err, res) })
        } catch (e) {
            handlers.HandleInternalError(e, res);
        }
    }
}

//AddNewExpense = new Base();
//AddNewExpense.hello();

module.exports = new AddNewExpense();