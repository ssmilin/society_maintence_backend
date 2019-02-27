const mongoose = require('mongoose');


const Expensedetails = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {type:String, default:''}, 
	amount: {type:Number, default:0},
	createdby: {type:String, default:''},
	remarks:{type:String, default:''},
	created:{ type: Date, default: Date.now },
    lastupdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expensedetails', Expensedetails);