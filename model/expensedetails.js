const mongoose = require('mongoose');


const Expensedetails = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	Name: {type:String, default:''}, 
	Amount: {type:Number, default:0},
	CreatedBy: {type:String, default:''},
    created:{ type: Date, default: Date.now },
	Lastupdated: { type: Date, default: Date.now },
	Remarks:{type:String, default:''}
});

module.exports = mongoose.model('Expensedetails', Expensedetails);