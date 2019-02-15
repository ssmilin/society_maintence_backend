const mongoose = require('mongoose');


const OtherIncomeDetails = new mongoose.Schema({
	name:{type:String, default:''},
    amount: {type:Number, default:0},
    remarks:{type:String, default:''},
    created:{ type: Date, default: Date.now },
    lastupdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OtherIncomeDetails', OtherIncomeDetails);