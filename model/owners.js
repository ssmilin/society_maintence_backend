const mongoose = require('mongoose');


const Owners = new mongoose.Schema({
    name: {type:String, default:''},
	dob: {type:String, default:''},
	age: {type:String, default:''},
    address:{ type: String, default: ''},
	mobile: { type:String, default:''},
    remarks:{type:String, default:''},
    createdby: {type:String, default: 'ADMIN'},
}, { timestamps: { createdAt: 'created', updatedAt: 'lastupdated' } });

module.exports = Owners;