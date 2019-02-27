const handlers = require('../Utils/handlers');

class AppBase {
    constructor(model, request, response) {
        this.model = model,
        this.request = request,
        this.response = response
    }
    /* Add if it is new report add it */
    addNewReport() {
       
    }
    /* Query and update the report */
    updateReport(query, update) {

    }
}


module.exports = AppBase;