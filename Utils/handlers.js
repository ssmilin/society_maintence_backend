
class Handlers {
    /*
        Handle the response for success
    */
    HandleResponse(doc, res) {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc)
        }
        return res.status(201).send(doc);
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
}
module.exports = new Handlers();
