const ownerschema = require('../model/owners');
const handlers = require('../Utils/handlers');
const mongoose = require('mongoose');

class UpdateMembers {
   constructor(request, response) {
        this.request = request.body;
        this.response = response;
        this.OwnersModel = mongoose.model(this.request.societyname+ "Members", ownerschema);
   }
    /*
        This method will create new memebers, if member
        it return message "Member already exist"
    */
    addNewOwners() {
        try {
            var member = new this.OwnersModel(this.request);
            var query = this.OwnersModel.findOne({ name: this.request.name });
            query.then(ownmemberer => {
                if (ownmemberer) {
                    return handlers.HandleRspAsync("Member already exist");
                } 
                return member.save();
            }).then(doc => { 
                handlers.HandleResponse(doc, this.response); 
            }).catch(err => { 
                handlers.HandleError(err, this.response) 
            })
        } catch (e) {
            handlers.HandleInternalError(e, this.response);
        }
    }
    /*
        This method will create update memeber, if member id 
        does not exist it return Member doesnot exist
    */
    updateMember(id) {
        try {
            this.OwnersModel.findOneAndUpdate(
                { '_id': mongoose.Types.ObjectId(this.request.id)},
                { '$set': this.request.updateobj},
                {new: true}
            ).then(memberdetails => {
                let response =  memberdetails ? memberdetails : "Member doesnot exist";
                handlers.HandleResponse(response, this.response);
            }).catch(err => { handlers.HandleError(err, this.response) });
        } catch (e) {
            handlers.HandleInternalError(e, this.response);
        }
    }
}
module.exports = UpdateMembers;

/* Sample input 
http://localhost:3000/expensereport/updatemember
{
	"id":"5c74d447d417c47538c237a2", //id of the member to update
	"updateobj":{"age":"94"}, 
	"societyname":"Greenpark"
}

http://localhost:3000/expensereport/addmember
{
    "name": "Ramesh",
    "age":"24",
    "societyname":"Greenpark"
}
*/