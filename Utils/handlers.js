
class Handlers {
    /*
        Handle the response for success
    */
    HandleResponse(doc, res) {
        if (doc) {
          return res.status(201).json(doc);
        }
    }
    /*
        Handle the response for catch event
    */
    HandleError(error, res) {
        console.log("error" .error);
        return res.status(500).json(error);
    }
    /*
        Handle the error thrown due to unexpected exception
    */
    HandleInternalError(error, res) {
        console.log("Error Message ", error)
        return res.status(500).json(error);
    }
    /* Handle respons e asynchronously */
    HandleRspAsync(res) {
        return new Promise((resolve, reject) => { resolve(res);});
    }
}
module.exports = new Handlers();
